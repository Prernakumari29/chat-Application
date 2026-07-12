import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const MyProfile = () => {

  let { setIsProfileOpen , setIsEditOpen} = useContext(ChatContext)
  let user = useSelector((state)=> state.auth.user)

  return (
    <div className="absolute right-2 top-16 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

      {/* Header */}
      <div className="bg-[#5BC6F1] h-24 relative">
        <img
          src={user?.pic}
          alt="profile"
          className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>


      {/* Body */}
      <div className="pt-16 pb-6 px-6">

        {/* Name */}
        <div className="text-center">

          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>

        </div>


        {/* Info */}
        <div className="mt-8 space-y-4">


          {/* About */}
          <div className="border rounded-xl p-3">

            <p className="text-xs text-gray-400 uppercase">
              About
            </p>

            <p className="text-gray-700 mt-1">
              {user?.about || "No about added"}
            </p>

          </div>


          {/* Phone */}
          <div className="border rounded-xl p-3">

            <p className="text-xs text-gray-400 uppercase">
              Phone
            </p>

            <p className="text-gray-700 mt-1">
              {user?.mobile ? user.mobile : "Not added"}
            </p>

          </div>


        </div>


        {/* Buttons */}
        <div className="mt-8 flex gap-3">

          <button className="flex-1 bg-blue-400 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition" onClick={()=> {setIsEditOpen(true) ; setIsProfileOpen(false)}}>
            Edit Profile
          </button>


          <button className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded-lg font-medium transition">
            Logout
          </button>

        </div>


      </div>

    </div>
  );
};

export default MyProfile;