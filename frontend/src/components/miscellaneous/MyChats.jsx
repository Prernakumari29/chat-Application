import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import apiInstance from "../../services/Api";
import { useSelector } from "react-redux";

const MyChats = () => {

  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
     setIsGroupOpen
  } = useContext(ChatContext);


  const [removedChats, setRemovedChats] = useState([]);


  const user = useSelector(
    (state)=>state.auth.user
  );


  const fetchChats = async()=>{

    try {

      const res = await apiInstance.get("/fetch-chat");

      setChats(res.data.data);

    } catch(error){

      console.log(error.response?.data?.message);

    }

  };



  useEffect(()=>{

    fetchChats();

  },[]);



  const getSender = (users)=>{

    return users.find(
      (u)=>u._id !== user._id
    );

  };



  // remove chat 
  const removeChat = async(e,chatId)=>{

    e.stopPropagation();
   try {
     await apiInstance.put(`/removeChat/${chatId}`)

     setChats((prev) =>
      prev.filter((chat)=> chat._id !== chatId)
     )
     if (selectedChat?._id === chatId) {
      setSelectedChat(null);
    }
   } catch (error) {}

   

  };



  return (

    <div className="bg-white h-160 overflow-y-auto w-180 p-4 ">

{/* ------------------------------------------my chats and create group-------------------------------------- */}
<div className="flex items-center justify-between mb-5">
  <h1 className="text-2xl font-bold">
    My Chats
  </h1>

  <button
    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white  rounded-lg shadow hover:scale-105 transition-all duration-200"
    onClick={()=>setIsGroupOpen(true)}
  >
    <i className="ri-group-line text-lg"></i>
    <span className="text-sm font-medium">Create Group</span>
    <i className="ri-add-line text-lg"></i>
  </button>
</div>


     {
       chats?.length === 0 ? (

    <p className="text-gray-500 text-center mt-10">
      No chats yet
    </p>

  ):
     
    (
        chats?.map((chat)=>(


          <div
            key={chat._id}
            onClick={()=>setSelectedChat(chat)}
            className={`
              flex items-center gap-3
              p-3 mb-3 rounded-xl
              cursor-pointer
              ${
                selectedChat?._id === chat._id
                ?
                "bg-gray-100"
                :
                "bg-gray-100"
              }
            `}
          >


            <img
              src={
                getSender(chat.users)?.pic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10"
              }
              className="w-12 h-12 rounded-full object-cover"
            />



            <div className="flex-1">


              <div className="flex justify-between items-center">

                <h2 className="font-semibold">

                  {
                    chat.isGroupChat
                    ?
                    chat.chatName
                    :
                    getSender(chat.users)?.name
                  }

                </h2>



                <button
                  onClick={(e)=>removeChat(e,chat._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  remove
                </button>


              </div>



              <p className="text-sm text-gray-500">

                {
                  chat.latestMessages
                  ?
                  chat.latestMessages.content
                  :
                  "No message yet"
                }

              </p>


            </div>


          </div>


        ))
    )

}
    </div>

  )
}

export default MyChats;