import React, { useEffect, useState } from 'react'
import axios  from 'axios'

const ChatPage = () => {

    const [chats , setChats] = useState([])

    const fetchChats = async()=>{
    const response = await axios.get("http://localhost:3000/api/chats" , {withCredentials:true} )
    console.log(response.data)
    setChats(response.data)
  }

  useEffect(()=>{
    fetchChats();
  },[])
    
  return (
    <div>
      <h1>here you will see chatpage</h1>
      {
        chats.map((chat)=>{
          return <div key={chat._id}>{chat.chatName}</div>
        })
      }
    </div>
  )
}

export default ChatPage
