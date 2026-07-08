const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");


// --------------------------------------------accessChat---------------------------------------
const accessChat = async(req,res)=>{
  let { userId} = req.body;

  if(!userId){
    throw new apiError(400 , "UserId param not sent with request")
  }

  var isChat = await ChatModel.find({
    isGroupChat:false,
    $and:[
      {users:{$elemMatch:{$eq:req.user._id}}},
      {users:{$elemMatch:{$eq: userId}}},

    ]
  }).populate("users" , "-password").populate("latestMessages");

  isChat = await UserModel.populate(isChat , {
    path:"latestMessages.sender",
    select: "name pic email",
  })

  if(isChat.length > 0){
    res.send(isChat[0])
  }else{
    var chatData = {
      chatName : "sender",
      isGroupChat: false,
      users: [req.user._id , userId]
    }
  }

  try {
    const createChat = await ChatModel.create(chatData);

    const fullchat = await ChatModel.findOne({_id: createChat._id}).populate("users" , "-password");

    return res
    .status(200)
    .json ({ message: "chat created" , fullchat})
  } catch (error) {
    res.status(500).json({
      message:"something went wrong"
    })
  }
}

// ---------------------------------fetch chat--------------------------------------
const fetchChat = async(req,res)=>{
  let results = await ChatModel.find({users: {$elemMatch: {$eq:req.user._id}}})
  .populate("users" , "-password")
  .populate("groupAdmin" , "-password")
  .populate("latestMessages")
  .sort({updatedAt:-1})

   results = await UserModel.populate(results,{
      path:"latestMessages.sender",
      select:"name pic email",
    });
  
    return res
    .status(200)
    .json(new apiResponse("Chats fetched successfully" , results))
}

// -------------------------------------create groupChat-----------------

const groupChatController = async(req,res)=>{
  if(!req.body.users || !req.body.name){
    throw new apiError(400,"please fill all the fields")
  }
  var users = JSON.parse(req.body.users);

  if(users.length < 2){
    throw new apiError(400 , "more than 2 users are required to form a group chat");
  }

  users.push(req.users);

  
    
    const groupchat = await ChatModel.create({
      chatName:req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    const fullGroupChat = await ChatModel.findOne({_id : groupchat._id})
      .populate("users" , "-password")
      .populate("groupAdmin" , "-password")

      return res
      .status(200)
      .json({
        fullGroupChat
      })

 
  
}

module.exports = {
  accessChat,
  fetchChat,
  groupChatController
}