const mongoose = require("mongoose")

const connected = async()=>{
    try {
        console.log("Mongo URI:", process.env.MONGODB_URI);
        const res = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected" , res.connection.host)
    } catch (error) {

        console.log(
            "error in db connection:",
            error.message
        );

        process.exit(1);
    }
}

module.exports = connected;