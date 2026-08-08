import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import {useForm} from "react-hook-form"
import apiInstance from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/authSlice";
import { toast } from "react-toastify";

const EditProfile = () => {

  const { isEditOpen, setIsEditOpen } = useContext(ChatContext);
  let {handleSubmit , register ,reset} = useForm();
  let user = useSelector((state)=>state.auth.user);

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);


  const saveChanges = async(data)=>{
    try {
       const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);

        if(image){
            formData.append("image", image);
        }

      const res = await apiInstance.patch("/auth/update-profile" , formData)
      console.log(res.data)
      toast.success(res.data.message)

      dispatch(updateUser(res.data.data))
      reset();
       setIsEditOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
      
  }

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  return (
    <>
      {
        isEditOpen &&

        <div className="fixed inset-0  bg-black/30 flex items-center justify-center z-50">


          <div className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">


            {/* Header */}
            <div className="h-24 bg-[#5BC6F1] relative">


              <label className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 cursor-pointer">


                <img
                  src={
                    preview ||
                    user.pic
                  }
                  alt="profile"
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />


                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">

                  <span className="text-white text-xs">
                    Change
                  </span>

                </div>


                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                  onChange={handleImageChange}
                />


              </label>


            </div>



            {/* Body */}
            <div className="pt-16 px-6 pb-6">


              <h2 className="text-center text-2xl font-bold text-gray-800">
                Edit Profile
              </h2>



              {/* Name */}
              <div className="mt-6">

                <label className="text-sm text-gray-500">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className="w-full mt-2 px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                />

              </div>




              {/* About */}
              <div className="mt-4">

                <label className="text-sm text-gray-500">
                  About
                </label>


                <textarea
                  rows="3"
                  placeholder="Write something about yourself..."
                  {...register("about")}
                  className="w-full mt-2 px-3 py-2 border rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-300"
                />

              </div>





              {/* Mobile */}
              <div className="mt-4">


                <label className="text-sm text-gray-500">
                  Mobile (Optional)
                </label>


                <input
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("mobile")}
                  className="w-full mt-2 px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                />


              </div>





              {/* Buttons */}
              <div className="flex gap-3 mt-7">


                <button
                  className="flex-1 bg-[#5BC6F1] hover:bg-blue-500 text-white py-2 rounded-xl font-medium transition"
                  onClick={handleSubmit(saveChanges)}
                >
                  Save Changes
                </button>




                <button
                  className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-xl font-medium transition"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>


              </div>



            </div>


          </div>


        </div>

      }

    </>
  );
};

export default EditProfile;