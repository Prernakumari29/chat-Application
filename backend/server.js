require("dotenv").config();
const express = require("express");
const chats = require("./src/data/data")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.get("/api/chats" , (req , res)=>{
    res.send(chats)
})

const port = process.env.PORT || 8000;
app.listen(port , ()=>{
    console.log("server is running on the port" , port);
})