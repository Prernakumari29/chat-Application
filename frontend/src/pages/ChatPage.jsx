import React from 'react'
import bgImage from "../assets/bgImage.jpg"
import { useContext } from 'react'
import {ChatContext} from "../context/ChatProvider"
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/MyChats'
import ChatBox from '../components/miscellaneous/ChatBox'


const ChatPage = () => {

  let {user } = useContext(ChatContext)
  return (
     <div className='min-h-screen  bg-cover bg-center' style={{ backgroundImage: `url(${bgImage})` }}>
    
     <div >
       {user && <SideDrawer /> }
       <div className='flex justify-between gap-5 p-4'>
        {user && <MyChats />}
       {user && <ChatBox />}
       </div>

     </div>
      
      
    </div>
  )
}

export default ChatPage
