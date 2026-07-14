import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'
import apiInstance from '../services/Api'

const SearchCard = () => {

    let {searchResult, setSearchResult , chats ,setChats , selectedChat ,setSelectedChat ,  setIsSearchOpen} = useContext(ChatContext)

 const accessChat = async(userId)=>{

  try {

    const res = await apiInstance.post("/chat", {userId});

    const chat = res.data.fullchat || res.data;


    setSelectedChat(chat);


    setChats((prev)=>[
      chat,
      ...prev.filter((c)=>c._id !== chat._id)
    ]);


    setIsSearchOpen(false);


  } catch(error){

    console.log(error.response?.data?.message);

  }

}
  return (
    <>
      
                {
                  searchResult.map((item)=>(


                    <div
                      key={item._id}
                      onClick={()=>accessChat(item._id)}
                      className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl mb-2 cursor-pointer hover:bg-blue-50"
                    >



                      <img
                        src={
                          item.pic ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10"
                        }
                        className="h-12 w-12 rounded-full object-cover"
                        alt=""
                      />



                      <div>

                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>


                        <p className="text-sm text-gray-500">
                          Email : {item.email}
                        </p>


                      </div>



                    </div>


                  ))
                }
    </>
  )
}

export default SearchCard
