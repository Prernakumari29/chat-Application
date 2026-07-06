import React, { useState } from "react";
import {useForm} from "react-hook-form";

const Register = () => {
  const [showpassword , setShowpassword] = useState(false)
  const {handleSubmit , register , reset} =useForm();

  const submit = (data)=>{
    console.log(data)
    reset();
  }
  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
     

      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-gray-700 font-medium mb-2"
          >
            Name<span className="text-red-700">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            {...register("name" , {required:true})}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-700 font-medium mb-2"
          >
            Email Address<span className="text-red-700">*</span>
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            {...register("email" , {required:true})}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
       <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-700 font-medium mb-2"
          >
            Password<span className="text-red-700">*</span>
          </label>

          <div className="relative w-full ">
            <input
            id="password"
            type={showpassword?"text":"password"}
            placeholder="Enter your password"
            {...register("password" , {required:true})}
            className=" w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {showpassword ? 
          <i className="ri-eye-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl active:scale-90" onClick={()=>setShowpassword(false)}></i>          
          :<i className="ri-eye-off-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl active:scale-90" onClick={()=>setShowpassword(true)}></i>
          }
          
          </div>
        </div>


        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 font-medium mb-2"
          >
            Confirm Password<span className="text-red-700">*</span>
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            {...register("confirmPassword" , {required:true})}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload Picture */}
        <div className="flex flex-col">
          <label
            htmlFor="picture"
            className="text-gray-700 font-medium mb-2"
          >
            Upload Your Picture
          </label>

          <input
            id="picture"
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
        >
          Sign Up
        </button>

      </form>
    </div>
  );
};

export default Register;
