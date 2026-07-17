import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import apiInstance from "../../services/Api";


const AddGroupMember = () => {


  const {
    selectedChat,
    setSelectedChat,
    setIsAddMemberOpen
  } = useContext(ChatContext);



  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);




  // Search User

const handleSearch = async(e)=>{

  const value = e.target.value;

  setSearch(value);


  if(!value.trim()){

    setSearchResult([]);

    return;

  }


  try {


    const response = await apiInstance.get(
      `/auth/search-user?search=${value}`
    );


    const users = response.data.data;



    const filteredUsers = users.filter(
      (user)=>
        !selectedChat.users.some(
          (member)=>
            member._id === user._id
        )
    );


    setSearchResult(filteredUsers);



  }
  catch(error){

    console.log(error);

  }

};







  // Add Member

  const handleAddMember = async(userId)=>{


    try{


      const {data} = await apiInstance.put(
        "/groupAdd",
        {
          chatId:selectedChat._id,
          userId:userId
        }
      );



      // Update selected chat

      setSelectedChat(data);



      // Search clear

      setSearch("");

      setSearchResult([]);



    }
    catch(error){

      console.log(error);

    }


  };





  return (

    <div
      className="
      absolute
      top-0
      right-0
      w-80
      h-full
      bg-white
      rounded-2xl
      shadow-2xl
      border
      z-50
      overflow-hidden
      "
    >



      {/* Header */}


      <div
        className="
        flex
        items-center
        gap-3
        px-5
        py-4
        border-b
        "
      >


        <button
          onClick={()=>setIsAddMemberOpen(false)}
          className="
          w-9
          h-9
          rounded-full
          hover:bg-gray-100
          "
        >

          <i className="ri-arrow-left-line text-xl"></i>

        </button>



        <h2 className="text-lg font-semibold">
          Add Member
        </h2>


      </div>





      {/* Search */}


      <div className="p-4">


        <input

          type="text"

          value={search}

          onChange={handleSearch}

          placeholder="Search member..."

          className="
          w-full
          border
          border-gray-300
          rounded-full
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-300
          "

        />


      </div>







      {/* Search Result */}


      <div
        className="
        px-4
        overflow-y-auto
        max-h-[500px]
        "
      >


        {
          searchResult.length === 0 && search && (

            <p className="
            text-center
            text-gray-400
            mt-5
            ">
              No user found
            </p>

          )
        }




        {
          searchResult.map((user)=>(


            <div
              key={user._id}

              className="
              flex
              items-center
              justify-between
              p-3
              rounded-xl
              hover:bg-gray-100
              "
            >


              {/* User */}

              <div
                className="
                flex
                items-center
                gap-3
                "
              >

                <img

                  src={user.pic}

                  className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  "

                />


                <p className="font-medium">
                  {user.name}
                </p>


              </div>





              {/* Add Button */}


              <button

                onClick={() =>
                  handleAddMember(user._id)
                }

                className="
                bg-blue-500
                text-white
                px-4
                py-2
                rounded-full
                hover:bg-blue-600
                "

              >

                Add

              </button>


            </div>


          ))
        }



      </div>




    </div>

  );
};


export default AddGroupMember;