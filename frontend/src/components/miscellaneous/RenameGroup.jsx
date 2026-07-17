import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import apiInstance from "../../services/Api";


const RenameGroup = () => {

  const {
    selectedChat,
    setSelectedChat,
    setIsRenameOpen
  } = useContext(ChatContext);


  const [name,setName] = useState(
    selectedChat?.chatName || ""
  );


  const handleRename = async()=>{

    try {

      const {data} = await apiInstance.put(
        "/rename",
        {
          chatId:selectedChat._id,
          chatName:name
        }
      );


      setSelectedChat(data);

      setIsRenameOpen(false);


    } catch(error){

      console.log(error);

    }

  };


  return (

    <div
      className="
      absolute
      top-15
      right-0
      w-80
      bg-white
      rounded-xl
      shadow-xl
      border
      p-5
      z-50
      "
    >

      <div className="flex justify-between mb-4">

        <h2 className="font-semibold text-lg">
          Rename Group
        </h2>


        <button
          onClick={()=>setIsRenameOpen(false)}
        >
          ✕
        </button>

      </div>



      <input

        value={name}

        onChange={(e)=>setName(e.target.value)}

        className="
        w-full
        border
        rounded-lg
        px-4
        py-2
        "

      />


      <button

        onClick={handleRename}

        className="
        mt-4
        w-full
        bg-blue-500
        text-white
        py-2
        rounded-lg
        "

      >
        Update

      </button>


    </div>

  );
};


export default RenameGroup;
