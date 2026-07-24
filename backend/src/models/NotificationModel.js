const mongoose = require("mongoose");

const Notification = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
     chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"chat",
    required:true
  },

  content:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"message",
    required:true
  },

  isRead:{
    type:Boolean,
    default:false
  }
} , {timestamps:true});

const NotificationModel = mongoose.model("notify" , Notification)

module.exports = NotificationModel;
