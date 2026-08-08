require("dotenv").config();
const express = require("express");
const http = require("http")
// path import
const path = require("path")
const chats = require("./src/data/data")
const cors = require("cors");
const connected = require("./src/config/db");
const errormiddleware = require("./src/middleware/error.middleware");
const authRoutes = require("./src/routes/userRoutes")
const ImageRoute = require("./src/routes/imageRoutes")
const chatRoute = require("./src/routes/chatRoutes")
const notificationRoute = require("./src/routes/NotificationRoutes")
const messageRoutes = require("./src/routes/messageRoute")
const cookieParser = require("cookie-parser")

const {Server} = require("socket.io")

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
// middleware static files 
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin:[
       "http://localhost:5173"
    ],
    credentials: true,
  })
);

const io = new Server(server , {
    pingTimeout:60000,
    cors: {
    origin: [
      "http://localhost:5173",
    ],
    credentials: true
  }
})

const onlineUsers = {};

io.on("connection" , (socket)=>{
   console.log("connected to socket.io")

   socket.on("setup", (userData)=>{
      socket.join(userData._id);

      onlineUsers[userData._id] = socket.id;
      io.emit("online users" , Object.keys(onlineUsers));

      socket.emit("connected");

   });

   socket.on("join chat" , (room)=>{
      socket.join(room);
      console.log("user join Room" , room)
   });

   socket.on("typing", (room) => {
    socket.to(room).emit("typing", room);
});

socket.on("stop typing", (room) => {
    socket.to(room).emit("stop typing", room);
});


   socket.on("new message" , (newMessageRecieved)=>{

      var chat = newMessageRecieved.chat;

      if(!chat.users) return console.log("chat.users is not defined")

      chat.users.forEach(user => {
        if(user._id == newMessageRecieved.sender._id) return ;

        socket.in(user._id).emit("message received" , newMessageRecieved)
      })  
   })

   socket.on("disconnect", () => {

  console.log("User Disconnected");

  for (let userId in onlineUsers) {

    if (onlineUsers[userId] === socket.id) {

      delete onlineUsers[userId];
      break;

    }

  }

  io.emit("online users", Object.keys(onlineUsers));

})

})



connected();
// "/api" -->backend
app.use("/api/auth" , authRoutes)
app.use("/api", ImageRoute)
app.use("/api" , chatRoute )
app.use("/api/message" , messageRoutes)
app.use("/api" , notificationRoute)

// last me wildcard route banao
app.get('{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errormiddleware)
const port = process.env.PORT || 8000;
server.listen(port , ()=>{
    console.log("server is running on the port" , port);
})