import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import GroupInfo from "./GroupInfo";
import apiInstance from "../../services/Api";
import io from "socket.io-client";
import Lottie from "lottie-react"
import typingAnimation from "../../Annimation/Typing.json"

const ENDPOINT = "http://localhost:3000";
var socket , selectedChatCompare

const ChatBox = () => {

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected , setSocketConnected] = useState(false);
  const [typing , setTyping] = useState(false)
  const [istyping , setIstyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);

  const messageEndRef = useRef(null);
  const selectedChatRef = useRef(null);


  const {
    selectedChat,
    isGroupInfoOpen,
    setIsGroupInfoOpen,
    notification , setNotification,
    chats , setChats
  } = useContext(ChatContext);



  const user = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    selectedChatRef.current = selectedChat;
}, [selectedChat]);



  const getSender = (users) => {

    return users?.find(
      (u) => u._id !== user._id
    );

  };



  const fetchMessages = async()=>{

    if(!selectedChat) return;


    try{

      setLoading(true);


      const {data} = await apiInstance.get(
        `/message/${selectedChat._id}`
      );


      setMessages(data);


      setLoading(false);

      socket.emit("join chat" , selectedChat._id);


    }catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  useEffect(() => {
   socket = io(ENDPOINT);
   socket.emit("setup" , user);
   socket.on("connected",()=>setSocketConnected(true))
   socket.on("typing", (room) => {
      if(selectedChatRef.current?._id === room){
            setIstyping(true);
        }

});
   socket.on("stop typing", (room) => {
    if(selectedChatRef.current?._id === room){
            setIstyping(false);
        }
});
   socket.on("online users", (users) => {setOnlineUsers(users)});

    return () => {
        socket.disconnect();
    };

},[])



  useEffect(()=>{

    fetchMessages();
    selectedChatCompare = selectedChat;

  },[selectedChat]);

 


useEffect(() => {

  const handleMessageReceived = async (newMessageReceived) => {

    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageReceived.chat._id
    ) {

      try {

        const { data } = await apiInstance.get("/notification");

        setNotification(data);

      } catch (error) {

        console.log(error);

      }

    } else {

      setMessages((prev) => [
        ...prev,
        newMessageReceived,
      ]);

    }

  };

  socket.on("message received", handleMessageReceived);

  return () => {
    socket.off("message received", handleMessageReceived);
  };

}, [selectedChatCompare]);


  useEffect(()=>{

  messageEndRef.current?.scrollIntoView({
    behavior:"smooth"
  });

},[messages]);





  const sendMessage = async()=>{


if(!message.trim()) return;
socket.emit("stop typing" , selectedChat._id)


try{

const {data} = await apiInstance.post(
"/message",
{
content:message,
chatId:selectedChat._id
}
);


setMessages((prev)=>[
 ...prev,
 data
]);

socket.emit("new message" , data)


setMessage("");


}
catch(error){

console.log(error);

}


};








  if(!selectedChat){

    return (

      <div
      className="
      bg-transparent
      w-full
      h-full
      rounded-2xl
      flex
      items-center
      justify-center
      "
      >

      </div>

    );

  }





  const sender = getSender(
    selectedChat.users
  );
  const isOnline = onlineUsers.includes(sender?._id);

  // ---------------------------------------typing Indicator------------------------------------------

  const typingHandler = (e)=>{
    setMessage(e.target.value)
    if(! socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing" , selectedChat._id)
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff >= timerLength && typing){
        socket.emit("stop typing" , selectedChat._id);
        setTyping(false)
      }
    }, timerLength);
  }





  return (


    <div

    className="
    bg-white
    w-full
    h-full
    flex
    flex-col
    overflow-hidden
    "

    >





      {/* HEADER */}


      <div

      className="
      p-2
      flex
      items-center
      gap-4
      px-6
      border-b
      shrink-0
      "

      >



        <img

        src={sender?.pic}

        className="
        w-12
        h-12
        rounded-full
        object-cover
        "

        />




        <div>


          <h2 className="text-lg font-semibold">


            {
              selectedChat.isGroupChat

              ?

              selectedChat.chatName

              :

              sender?.name

            }


          </h2>

{/* ----------------------------------------online/offline features-------------------------------------- */}
         {
  !selectedChat.isGroupChat && (
    <p
      className={`text-sm ${
        isOnline
          ? "text-green-500"
          : "text-gray-400"
      }`}
    >
      {isOnline ? "Online" : "Offline"}
    </p>
  )
}


        </div>





        {
          selectedChat.isGroupChat && (


            <button

            onClick={()=>
              setIsGroupInfoOpen(
                !isGroupInfoOpen
              )
            }


            className="
            ml-auto
            text-xl
            hover:scale-110
            transition
            "

            >

              <i className="ri-more-2-line font-bold"></i>


            </button>


          )

        }





        {

        isGroupInfoOpen &&

        <GroupInfo />

        }



      </div>









      {/* MESSAGE AREA */}


      <div

      className="
      flex-1
      overflow-y-auto
      px-6
      py-5
      "

      >



        <div

        className="
        h-115
        overflow-y-auto
        flex
        flex-col
        gap-3
        "

        >




        {


        loading ?


        (

          <p
          className="
          text-gray-400
          text-center
          "
          >

            Loading...

          </p>


        )


        :


        messages.length === 0 ?


        (

          <p
          className="
          text-gray-400
          text-center
          mt-10
          "
          >

            No messages yet

          </p>


        )


        :


       messages.map((msg) => {

  const isMyMessage = msg.sender._id === user._id;

  return (

    <div
      key={msg._id}
      className={`
        flex
        w-full
        mb-3
        ${isMyMessage ? "justify-end" : "justify-start"}
      `}
    >

      {/* Other User Avatar */}
      {!isMyMessage && selectedChat.isGroupChat && (
        <img
          src={msg.sender.pic || "https://ui-avatars.com/api/?name=User"}
          alt={msg.sender.name}
          className="
            w-9
            h-9
            rounded-full
            object-cover
            mr-2
            self-end
            shrink-0
          "
        />
      )}

      <div
        className={`
          max-w-[70%]
          px-4
          py-2
          rounded-2xl
          shadow-sm
          ${
            isMyMessage
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }
        `}
      >

        {/* Sender Name */}
        {!isMyMessage && selectedChat.isGroupChat && (
          <p className="text-xs font-semibold text-blue-600 mb-1">
            {msg.sender.name}
          </p>
        )}

        {/* Message */}
        <p className="text-sm">
          {msg.content}
        </p>

        {/* Time */}
        <p
          className={`
            text-[10px]
            mt-1
            text-right
            ${
              isMyMessage
                ? "text-blue-100"
                : "text-gray-500"
            }
          `}
        >
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

      </div>

    </div>

  );

})

        


        }

        <div ref={messageEndRef}></div>




        </div>



      </div>







      {istyping ? <div>
        <Lottie
        animationData={typingAnimation}
        loop={true}
        autoPlay={true}
        className="w-20 h-8"
           />
      </div> : <></>}

      {/* INPUT */}



      <div

      className="
      p-3
      px-5
      flex
      items-center
      border-t
      shrink-0
      "

      >



        <div

        className="
        flex
        w-full
        gap-3
        items-center
        "

        >




          <div

          className="
          flex-1
          relative
          "

          >



            <input

            type="text"

            value={message}

            onChange={typingHandler}

onKeyDown={(e)=>{

  if(e.key === "Enter" && !e.shiftKey){
    
    e.preventDefault();
    sendMessage();

  }

}}

            


            placeholder="Type a message..."


            className="
            w-full
            border
            border-gray-300
            rounded-full
            px-3
            py-3
            pl-12
            outline-none
            focus:ring-2
            focus:ring-blue-300
            "

            />






            <button

            onClick={()=>
              setShowEmoji(!showEmoji)
            }


            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-xl
            "

            >

              <i className="ri-emoji-sticker-line"></i>


            </button>







            {

            showEmoji &&

            (

              <div

              className="
              absolute
              bottom-14
              left-0
              z-50
              "

              >


                <EmojiPicker

                onEmojiClick={(emojiData)=>{

                  setMessage(
                    message + emojiData.emoji
                  )

                }}

                />


              </div>


            )


            }





          </div>






          <button

          onClick={sendMessage}


          className="
          bg-blue-500
          text-white
          px-7
          py-3
          rounded-full
          hover:bg-blue-600
          "

          >

            Send

          </button>





        </div>



      </div>





    </div>


  );

};


export default ChatBox;