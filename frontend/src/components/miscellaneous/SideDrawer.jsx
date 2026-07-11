import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { ChatContext } from '../../context/ChatProvider';

const SideDrawer = () => {

    const [search , setSearch] = useState("");
    const[searchResult , setSearchResult] = useState([]);
    const[loading , setLoading] = useState(false);
    const [isProfileOpen , setIsProfileOpen] = useState(false);
     let {user} = useContext(ChatContext)
    


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
        {isProfileOpen && (
        <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-lg border p-2 z-50">

          <div className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center gap-2">
            <i className="ri-user-line"></i>
            Profile
          </div>

          <div className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center gap-2">
            <i className="ri-settings-3-line"></i>
            Settings
          </div>

          <div className="px-3 py-2 hover:bg-red-50 text-red-500 rounded-lg cursor-pointer flex items-center gap-2">
            <i className="ri-logout-box-r-line"></i>
            Logout
          </div>

        </div>
      )}


       
      
    </div>
  )
}

export default SideDrawer

