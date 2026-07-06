import React from 'react'
import bgImage from "../assets/bgImage.jpg"
import Login from './auth/Login'
import { useState } from 'react'
import Register from './auth/Register'

const HomePage = () => {
    const [toggle , setToggle] = useState(true)
    const [active , setActive] = useState("login")
  return (
    <div className='min-h-screen flex justify-center items-center bg-cover bg-center' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='flex flex-col items-center gap-3  '>
        <div className='bg-white rounded-full w-xl p-3 m-3 flex items-center justify-center font-medium text-3xl '>
            <h1> <i className="ri-message-2-line text-blue-600 mr-2.5"></i>Quick Chat</h1>
        </div>


        <div className='bg-white  m-3 p-3'>
            <div className='flex justify-between gap-5 '>
                <div className={` rounded-3xl px-20 py-2 ${active == "login" ? "bg-blue-300" : "bg-gray-200"} `}  onClick={()=>{setToggle(true); setActive("login")} } >login                   
                </div>
                <div className={`rounded-3xl px-20 py-2 ${active == "register" ? "bg-blue-300" : "bg-gray-200"}  `}  onClick={()=>{setToggle(false);setActive("register") }}>sign up</div>
            </div>
            {
                toggle ? <Login active={active} setActive={setActive} /> :<Register active={active} setActive={setActive} />
            }
        </div>

      
      </div>
    </div>
  )
}

export default HomePage
