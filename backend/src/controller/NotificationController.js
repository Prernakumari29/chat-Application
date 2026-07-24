const NotificationModel = require("../models/NotificationModel");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler")

// -----------------------------------fetched Notification---------------------------------------
const fetchNotification = asyncHandler(async(req,res)=>{

     const notifications = await NotificationModel.find({
    receiver: req.user._id,
    isRead: false,
})
.populate("sender", "name pic")
.populate({
    path:"chat",
    populate:{
        path:"users",
        select:"name pic email"
    }
})
.populate("content")
.sort({ createdAt: -1 });



// group notifications by sender

const groupedNotifications = Object.values(
    notifications.reduce((acc, curr)=>{


        const senderId = curr.sender._id.toString();



        if(!acc[senderId]){

            acc[senderId] = {

                ...curr.toObject(),

                count:1

            };


        }
        else{


            acc[senderId].count += 1;


            // latest message show karna hai

            acc[senderId].content = curr.content;


        }



        return acc;


    },{})
    
)
res.status(200).json(groupedNotifications);
})





// --------------------------------------Marked as read----------------------------------------------

const markAsRead = asyncHandler(async(req,res)=>{

    const notification = await NotificationModel.updateMany(
        {
            receiver: req.user._id,
            chat: req.params.chatId,
            isRead:false
        },
        {
            $set:{
                isRead:true
            }
        }
    );


    res.status(200).json({
        message:"Notifications marked as read",
        notification
    });

});

module.exports = {
    fetchNotification,
    markAsRead
}