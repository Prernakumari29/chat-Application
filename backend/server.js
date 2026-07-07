require("dotenv").config();
const express = require("express");
const chats = require("./src/data/data")
const cors = require("cors");
const connected = require("./src/config/db");
const errormiddleware = require("./src/middleware/error.middleware");
const authRoutes = require("./src/routes/userRoutes")
const ImageRoute = require("./src/routes/imageRoutes")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connected();


app.get("/api/chats" , (req , res)=>{
    res.send(chats)
})

app.use("/api/auth" , authRoutes)
app.use("/api", ImageRoute)


app.use(errormiddleware)
const port = process.env.PORT || 8000;
app.listen(port , ()=>{
    console.log("server is running on the port" , port);
})