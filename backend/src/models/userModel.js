const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    },
    pic:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10"

    }
} , {timeseries:true})

const UserModel = mongoose.model("user" , userSchema)
module.exports = UserModel;