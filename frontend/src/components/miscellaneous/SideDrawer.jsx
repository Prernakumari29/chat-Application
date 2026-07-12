import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { ChatContext } from '../../context/ChatProvider';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const SideDrawer = () => {

    const [search , setSearch] = useState("");
    const[searchResult , setSearchResult] = useState([]);
    const[loading , setLoading] = useState(false);
    
     let { isProfileOpen , setIsProfileOpen , isEditOpen } = useContext(ChatContext)
     let user = useSelector((state) => state.auth.user)

     
  return (
    <div className='h-15 bg-white text-black p-4 rounded-xl mx-2 flex justify-between'>

        {/* -------------------------searchBar-------------------------------------------------- */}
        <div className='flex items-center  gap-3  hover:bg-blue-50 rounded-lg px-3 py-4 shadow-md bg-gray-50'>
           <i className="ri-search-line"></i>
           <input
      type="text"
      placeholder="Search users..."
      className="w-full outline-none text-gray-700 placeholder-gray-400 "
    />  
        </div>

        
        <div className="flex items-center gap-2">
  <i className="ri-message-2-fill text-4xl text-[#5BC6F1]"></i>

{/* ------------------------------------ quick chat--------------------------------------------- */}
  <h1 className="text-3xl font-black tracking-tight text-gray-800">
    Quick<span className="text-[#5BC6F1]"> Chat</span>
  </h1>
</div>


        <div className='flex gap-2.5 items-center'>
            <i className="ri-notification-2-fill text-2xl"></i>
            <div className='flex'>
              <img className='h-10 w-10 rounded-full border border-gray-400' src={user.pic} alt="" />
              {isProfileOpen ? <i className="ri-arrow-drop-up-line text-3xl" onClick={()=>setIsProfileOpen(false)}></i> :<i className="ri-arrow-drop-down-line text-3xl" onClick={()=>setIsProfileOpen(true)}></i>}
            </div>
        </div>


{/* --------------------------------------------------dropdown--------------------------------------- */}
    {
      isProfileOpen && <MyProfile />
    }
    {
      isEditOpen && <EditProfile />
    }
       
      
    </div>
  )
}

export default SideDrawer

