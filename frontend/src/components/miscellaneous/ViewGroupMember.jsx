import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import apiInstance from "../../services/Api";
import { useSelector } from "react-redux";

const ViewGroupMember = () => {

  const {
    selectedChat,
    setSelectedChat,
    setIsViewMembersOpen
  } = useContext(ChatContext);

  let auth = useSelector((state)=>state.auth);

let user = auth.user;
console.log(user)


  const handleRemoveMember = async (userId) => {

  try {

    const { data } = await apiInstance.put(
      "/removeGroup",
      {
        chatId: selectedChat._id,
        userId: userId
      }
    );


    // updated group ko UI me set karna

    setSelectedChat(data);


  } catch (error) {

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
          onClick={() => setIsViewMembersOpen(false)}
          className="
          w-9
          h-9
          rounded-full
          hover:bg-gray-100
          "
        >

          <i className="ri-arrow-left-line text-xl"></i>

        </button>


        <h2
          className="
          text-lg
          font-semibold
          "
        >
          Group Members
        </h2>


      </div>



      {/* Member Count */}


      <div
        className="
        px-5
        py-3
        text-sm
        text-gray-500
        border-b
        "
      >

        {selectedChat?.users?.length} Members

      </div>




      {/* Members List */}


      <div
        className="
        p-5
        overflow-y-auto
        
        "
      >

        {
          selectedChat?.users?.map((member)=>(


            <div
              key={member._id}
              className="
              flex
              items-center
              justify-between
              mb-4
              "
            >



              {/* User Info */}

              <div
                className="
                flex
                items-center
                gap-3
                "
              >


                <img

                  src={member.pic}

                  className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  "

                />


                <div>


                  <p
                    className="
                    font-medium
                    text-gray-800
                    "
                  >
                    {member.name}
                  </p>



                  {
                    selectedChat?.groupAdmin?._id === member._id &&

                    <p
                      className="
                      text-xs
                      text-blue-500
                      "
                    >
                      Admin
                    </p>

                  }


                </div>


              </div>





              {/* Remove Button */}

              {
                selectedChat?.groupAdmin?._id === user?._id &&
                selectedChat?.groupAdmin?._id !== member._id &&


                <button


                  className="
                  w-9
                  h-9
                  rounded-full
                  hover:bg-red-50
                  text-red-500
                  "
                  onClick={() => handleRemoveMember(member._id)}

                >

                  <i className="ri-delete-bin-line"></i>


                </button>

              }
         



            </div>


          ))
        }


      </div>


    </div>


  );

};



export default ViewGroupMember;
