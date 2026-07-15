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

  await ChatModel.findByIdAndUpdate(
    isChat[0]._id,
    {
      $pull:{
        removedBy:req.user._id
      }
    }
  );

 return res.send(isChat[0])
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
  let results = await ChatModel.find({users: {$elemMatch: {$eq:req.user._id}}, removedBy:{$ne:req.user._id} })
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

// -------------------------------------remove chat----------------------------------

const removeChat = async(req,res) =>{
  
  const chat = await ChatModel.findByIdAndUpdate(
    req.params.chatId,
    {
      $addToSet:{
        removedBy:req.user._id
      }
    },
    {
      new:true
    }
  )

   if (!chat) {
      return res
        .status(404)
        .json(new apiError(404, "Chat not found"));
    }
  return res
  .status(200)
  .json(new apiResponse("chat removed successfully" , chat))
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

  users.push(req.user._id);

  
    
    const groupchat = await ChatModel.create({
      chatName:req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
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

// ------------------------------------------------rename route-----------------------------------

const rename = async(req,res)=>{
  const {chatId , chatName} = req.body;

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },{
      new:true,
    }
  )
  .populate("users" , "-password")
  .populate("groupAdmin" , "-password")

  if(!updatedChat){
    throw new apiError(404, "chat Not found")
  } else{
    res.json(updatedChat);
  }
}

// --------------------------------------------------add to group---------------------------
const addToGroup = async(req,res) =>{
  const {chatId , userId} = req.body;

  const added = await ChatModel.findByIdAndUpdate(
     chatId,
  {
    $addToSet: { users : userId},
  },
  {
    new:true
  }
  )
  .populate("users" , "-password")
  .populate("groupAdmin" , "-password")

  if(!added){
    throw new apiError(404, "chat Not found")
  } else{
    res.json(added);
  }
}

// -------------------------------------remove from the group-------------------

const removeFromGroup = async(req,res)=>{

  const { chatId, userId } = req.body;


  if(!chatId || !userId){
    throw new apiError(
      400,
      "chatId and userId are required"
    );
  }


  const chat = await ChatModel.findById(chatId);


  if(!chat){
    throw new apiError(
      404,
      "Chat not found"
    );
  }



  // only admin can remove member

  if(
    chat.groupAdmin.toString() !== req.user._id.toString()
  ){

    throw new apiError(
      403,
      "Only admin can remove member"
    );

  }



  // admin ko remove nahi kar sakte

  if(
    chat.groupAdmin.toString() === userId
  ){

    throw new apiError(
      400,
      "Admin cannot be removed"
    );

  }



  const removed = await ChatModel.findByIdAndUpdate(

    chatId,

    {
      $pull:{
        users:userId
      }
    },

    {
      new:true
    }

  )
  .populate("users","-password")
  .populate("groupAdmin","-password");



  return res
  .status(200)
  .json(removed);

};







module.exports = {
  accessChat,
  fetchChat,
  removeChat,
  groupChatController,
  rename,
  addToGroup,
  removeFromGroup
}