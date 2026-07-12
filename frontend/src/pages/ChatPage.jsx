import React from 'react'
import bgImage from "../assets/bgImage.jpg"
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/MyChats'
import ChatBox from '../components/miscellaneous/ChatBox'
import { useSelector } from 'react-redux'


const ChatPage = () => {

  const user = useSelector((state)=> state.auth.user)
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
