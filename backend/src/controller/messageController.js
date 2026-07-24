const ChatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");
const NotificationModel = require("../models/NotificationModel");
const UserModel = require("../models/userModel");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler")



// -------------------------------------Send Message --------------------------------------------------------
const sendMessage = asyncHandler(async(req, res)=>{

    let {content , chatId} = req.body;

    if(!content || !chatId){
        console.log("invalid data")
        throw new apiError(400 , "Invalid Data")
    }

    var newMessage = {
        sender : req.user._id,
        content : content , 
        chat : chatId
    }

    try {
        
        var message = await MessageModel.create(newMessage)

        message = await message.populate("sender" , "name pic");
        message = await message.populate("chat" );
        message = await UserModel.populate(message , {
            path:"chat.users",
            select:"name pic email"
        })

    await ChatModel.findByIdAndUpdate(req.body.chatId , {
        latestMessages:message
    });
    
     // ---------------- Create Notifications ----------------

        for (const user of message.chat.users) {

            // Sender ko notification nahi bhejna
            if (user._id.toString() === req.user._id.toString()) {
                continue;
            }

            await NotificationModel.create({
                sender: req.user._id,
                receiver: user._id,
                chat: chatId,
                content: message._id,
            });

        }
    
    res.json(message)


    } catch (error) {
        throw new apiError(error.message)
    }


})

// --------------------------------------------all messages----------------------------------------------------------
const allMessages = asyncHandler(async(req,res)=>{

    const messages = await MessageModel.find({chat : req.params.chatId})
    .populate("sender" , "name pic email")
    .populate("chat");

    res.json(messages)
})

module.exports = {
    sendMessage,
    allMessages

}