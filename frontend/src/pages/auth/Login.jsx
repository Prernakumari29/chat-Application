import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiInstance from "../../services/Api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {

  const [showpassword , setShowpassword] = useState(false)
  const {handleSubmit , register , reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async(data)=>{
    try {
      const res = await apiInstance.post("/auth/login" , data);

      let user = res.data.data;
      dispatch(setUser(user))   
      toast.success(res.data.message);
      reset();
      navigate("/chat")
    } catch (error) {
      alert(error.response?.data?.message || "something went wrong")
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
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

          <div className="relative w-full">
            <input
            id="password"
            type={showpassword?"text":"password"}
            required
            {...register("password" , {required:true})}
            placeholder="Enter your password "
            className=" w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {showpassword ? 
          <i className="ri-eye-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl active:scale-90" onClick={()=>setShowpassword(false)}></i>          
          :<i className="ri-eye-off-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl active:scale-90" onClick={()=>setShowpassword(true)}></i>
          }
          
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
        >
          Login
        </button>

       
      </form>
    </div>
  );
};

export default Login;