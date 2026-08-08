
const UserModel = require("../models/userModel");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const sendToImage = require("../service/storage.service");
const ChatModel = require("../models/chatModel");
const jwt = require("jsonwebtoken")

// -------------------------------------------------register----------------------------------------

const registerUser = asyncHandler(async(req,res)=>{
  let {name , email ,password } = req.body;
  let file = req.file
  if(!name || !email || !password){
    throw new apiError(400 , "all fields are required")
  }

  const isExisted = await UserModel.findOne({email})
  if(isExisted){
    throw new apiError(400 , "user already existed")
  }

  let imageUrl = "";
 
  if(file){
    const uploadImage = await sendToImage(file.buffer , file.originalname)
    imageUrl = uploadImage.url;
    console.log(uploadImage)
  }
  

  const hashpass = await bcrypt.hash(password , 10)
  const user = await UserModel.create({
    name ,
    email,
    password:hashpass,
    pic:imageUrl
  })

  let accessToken = generateAccessToken(user._id)
  let refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken" , accessToken , {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:15*60*1000   
  })

  res.cookie("refreshToken" , refreshToken,{
        httpOnly: true,
  secure: true,
  sameSite: "none",
        maxAge:24*60*60*1000
  })

  return res
  .status(201 )
  .json(new apiResponse("succesfully registered" , user))
})

// --------------------------------------login-----------------------------------------

const loginUser = asyncHandler(async(req,res)=>{

    let{email , password} = req.body;

    if(!email || !password){
        throw new apiError(400 , "all fields are required")
    }

    let isexisted = await UserModel.findOne({email})
    if(!isexisted){
        throw new apiError(404, "user not found")
    }

    let isMatch = await bcrypt.compare(password , isexisted.password)
    if(!isMatch){
        throw new apiError(401 , "Invalid credentials")
    }

    let accessToken = generateAccessToken(isexisted._id)
    let refreshToken = generateRefreshToken(isexisted._id)

    isexisted.refreshToken = refreshToken
    await isexisted.save();

    const user = await UserModel
    .findById(isexisted._id)
    .select("-password -refreshToken -mobile")

    res.cookie("accessToken" , accessToken,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:15*60*1000
    })

    res.cookie("refreshToken" , refreshToken , {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:24*60*60*1000
    })

    return res
    .status(200)
    .json(new apiResponse("welcome back" , user))
})

// ----------------------------------------search user-------------------------------------------

const searchUserController = asyncHandler(async(req, res)=>{
  
  const keyword = req.query.search ? {
   $or: [
    {name : {$regex: req.query.search , $options: "i"}},
    {email : {$regex: req.query.search , $options:"i"}},
   ]
  }
  :{};

  const users = await UserModel.find(keyword).find({_id: {$ne: req.user._id}});

  return res
  .status(200)
  .json(new apiResponse("searched user" , users))
});

// ----------------------------------------Update Profile------------------------------------

const UpdateProfile = async(req, res)=>{

    const {name, about, mobile} = req.body;

    const updateData = {};


    if(name) updateData.name = name;
    if(about) updateData.about = about;
    if(mobile) updateData.mobile = mobile;


    // profile image update
    if(req.file){

        const uploadImage = await sendToImage(
            req.file.buffer,
            req.file.originalname
        );

        updateData.pic = uploadImage.url;
    }


    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        updateData,
        {
            new:true
        }
    );


    return res
    .status(200)
    .json(new apiResponse("profile updated", user));

}

// ------------------------------------------------get current user-------------------------------------------

const getCurrentUser = async (req,res)=>{
  res.status(200).json({
    message:"Current user fetched succesfully",
    data: req.user
  })
}

// --------------------------------------------------log out---------------------------------------

const logout = async(req,res)=>{

  await UserModel.findByIdAndUpdate(req.user.id , {refreshToken:null})

  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")

  return res
  .status(200)
  .json(new apiResponse("logout Sucessfully"))

}

// ---------------------------get acess token------------------------------------

const getAccessToken = asyncHandler(async(req,res)=>{

  const refreshToken = req.cookies.refreshToken;
  if(refreshToken === null){
    console.log('null')
  }

  if(!refreshToken){
    throw new apiError(401 , "unauthorized")
  }

  const decode = jwt.verify(refreshToken , process.env.REFRESHTOKEN)

  const user = await UserModel.findById(decode.id);

  if(!user){
    throw new apiError(404 , "user not found");
  }

  if(refreshToken != user.refreshToken){
    throw new apiError(401 , "unauthorized request")
  }

  let accessToken = generateAccessToken(user._id)

  res.cookie("accessToken",accessToken , {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:15*60*1000 
  })

  return res
  .status(200)
  .json(new apiResponse("session refreshed successfully"))
  

})

module.exports = {
    registerUser,
    loginUser,
    searchUserController,
    UpdateProfile,
    getCurrentUser,
    logout,
    getAccessToken
    
}