
const UserModel = require("../models/userModel");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const registerUser = asyncHandler(async(req,res)=>{
  let {name , email ,password , pic} = req.body;

  if(!name || !email || !password){
    throw new apiError(400 , "all fields are required")
  }

  const isExisted = await UserModel.findOne({email})
  if(isExisted){
    throw new apiError(400 , "user already existed")
  }

  const hashpass = await bcrypt.hash(password , 10)
  const user = await UserModel.create({
    name ,
    email,
    password:hashpass,
    pic
  })

  let accessToken = generateAccessToken(user._id)
  let refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken" , accessToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:15*60*1000   
  })

  res.cookie("refreshToken" , refreshToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
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
    .select("-password -refreshToken")

    res.cookie("accessToken" , accessToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:15*60*1000
    })

    res.cookie("refreshToken" , refreshToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:24*60*60*1000
    })

    return res
    .status(200)
    .json(new apiResponse("welcome back"))
})

module.exports = {
    registerUser,
    loginUser
}