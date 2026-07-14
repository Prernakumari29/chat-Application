import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatProvider'
import apiInstance from '../../services/Api'

const CreateGroup = () => {

  let {
  isGroupOpen,
  setIsGroupOpen,
  groupName,
  setGroupName,
  groupSearch,
  setGroupSearch,
  searchResult,
  setSearchResult,
  selectedUsers,
  setSelectedUsers,
  chats,
  setChats,
  setSelectedChat
} = useContext(ChatContext)


  const handleSearch = async(e)=>{

    const value = e.target.value;

    setGroupSearch(value);


    if(!value.trim()){

      setSearchResult([]);

      return;
    }


    try {

      const res = await apiInstance.get(
        `/auth/search-user?search=${value}`
      );


      setSearchResult(res.data.data);


    } catch(error){

      console.log(
        error.response?.data?.message
      );

    }

  }



  const addUser = (user)=>{

    const alreadyAdded = selectedUsers.find(
      (item)=> item._id === user._id
    );


    if(alreadyAdded){
      return;
    }


    setSelectedUsers([
      ...selectedUsers,
      user
    ]);

  }



  const removeUser = (id)=>{

    setSelectedUsers(
      selectedUsers.filter(
        (user)=>user._id !== id
      )
    );

  }



  const closeModal = ()=>{

    setIsGroupOpen(false);

    setGroupName("");

    setGroupSearch("");

    setSearchResult([]);

    setSelectedUsers([]);

  }


  const createGroup = async()=>{

  try {

    const users = selectedUsers.map(
      (user)=>user._id
    );


    const res = await apiInstance.post(
      "/createGroup",
      {
        name: groupName,
        users: JSON.stringify(users)
      }
    );


    const groupChat = res.data.fullGroupChat;


    setChats([
      groupChat,
      ...chats
    ]);


    setSelectedChat(groupChat);


    setIsGroupOpen(false);


  } catch(error){

    console.log(error.response?.data?.message);

  }

}


  return (

    <>

    {
      isGroupOpen && (

        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >


          <div 
            className="bg-white w-120 rounded-xl p-6 shadow-xl"
            onClick={(e)=>e.stopPropagation()}
          >


            {/* Header */}

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Create New Group
              </h2>


              <button 
                onClick={closeModal}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>


            </div>



            {/* Group Name */}


            <input

              type="text"

              placeholder="Enter Group Name"

              value={groupName}

              onChange={(e)=>setGroupName(e.target.value)}

              className="w-full border border-gray-400 rounded-lg p-3 mb-4 outline-none"

            />



            {/* Search User */}


            <input

              type="text"

              placeholder="Search Members..."

              value={groupSearch}

              onChange={handleSearch}

              className="w-full border border-gray-400 rounded-lg p-3 mb-3 outline-none"

            />



            {/* Search Result */}


            <div className="max-h-40 overflow-y-auto">


            {
              searchResult?.map((user)=>(


                <div

                  key={user._id}

                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2"

                >


                  <div className="flex items-center gap-3">


                    <img

                      src={
                        user.pic ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10"
                      }

                      className="w-10 h-10 rounded-full object-cover"

                    />


                    <p className="font-medium">
                      {user.name}
                    </p>


                  </div>



                  <button

                    onClick={()=>addUser(user)}

                    className="bg-blue-600 text-white px-3 py-1 rounded-lg"

                  >

                    +

                  </button>


                </div>


              ))
            }


            </div>




            {/* Selected Members */}



            <div className="flex flex-wrap gap-2 my-4">


              {
                selectedUsers.map((user)=>(


                  <div

                    key={user._id}

                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"

                  >


                    <span>
                      {user.name}
                    </span>



                    <button

                      onClick={()=>removeUser(user._id)}

                    >

                      <i className="ri-close-line"></i>


                    </button>



                  </div>


                ))
              }


            </div>





            {/* Create Button */}


            <button
            onClick={createGroup}

              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

            >

              Create Group

            </button>



          </div>


        </div>

      )
    }

    </>

  )

}

export default CreateGroup