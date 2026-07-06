const mongoose = require("mongoose")

const connected = async()=>{
    try {
        const res = await mongoose.connect("mongodb://0.0.0.0/chatApp");
        console.log("mongodb connected")
    } catch (error) {
        console.log("error in db connection")
    }
}

module.exports = connected;