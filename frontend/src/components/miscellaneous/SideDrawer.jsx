import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import apiInstance from "../../services/Api";
import SearchCard from "../SearchCard";


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  let {searchResult, setSearchResult} = useContext(ChatContext)


  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    isEditOpen 
  } = useContext(ChatContext);


  const user = useSelector((state)=>state.auth.user);



  // ---------------- Search API ----------------

  const handleSearch = async()=>{

    if(!search.trim()){
      setSearchResult([]);
      return;
    }


    try {

      setLoading(true);

      const res = await apiInstance.get(
        `/auth/search-user?search=${search}`
      );

      setSearchResult(res.data.data);


    } catch(error){

      console.log(
        error.response?.data?.message
      );

    } finally{

      setLoading(false);

    }

  };

  // search type karte hi API call

  useEffect(()=>{

    handleSearch();

  },[search]);





  return (

    <div className="h-15 bg-white text-black p-4 rounded-xl mx-2 flex justify-between relative">


      {/* ---------------- Search Box ---------------- */}

      <div
        onClick={()=>setIsSearchOpen(true)}
        className="flex items-center gap-3 hover:bg-blue-50 rounded-lg px-3 py-4 shadow-md bg-gray-50 cursor-pointer"
      >

        <i className="ri-search-line"></i>

        <p className="text-gray-500">
          Search users...
        </p>

      </div>




      {/* ---------------- Logo ---------------- */}

      <div className="flex items-center gap-2">

        <i className="ri-message-2-fill text-4xl text-[#5BC6F1]"></i>


        <h1 className="text-3xl font-black tracking-tight text-gray-800">

          Quick
          <span className="text-[#5BC6F1]">
            Chat
          </span>

        </h1>


      </div>





      {/* ---------------- Profile ---------------- */}

      <div className="flex gap-2.5 items-center">


        <i className="ri-notification-2-fill text-2xl"></i>


        <div className="flex items-center">

          <img
            className="h-10 w-10 rounded-full border border-gray-400 object-cover"
            src={
              user?.pic ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10"
            }
            alt="profile"
          />



          {
            isProfileOpen ?

            <i
              className="ri-arrow-drop-up-line text-3xl cursor-pointer"
              onClick={()=>setIsProfileOpen(false)}
            ></i>

            :

            <i
              className="ri-arrow-drop-down-line text-3xl cursor-pointer"
              onClick={()=>setIsProfileOpen(true)}
            ></i>

          }


        </div>


      </div>





      {/* ---------------- Profile Dropdown ---------------- */}

      {
        isProfileOpen && <MyProfile/>
      }


      {
        isEditOpen && <EditProfile/>
      }







      {/* ---------------- Search Drawer ---------------- */}


      {
        isSearchOpen && (

          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={()=>setIsSearchOpen(false)}
          >


            <div
              className="fixed left-0 top-0 h-screen w-96 bg-white shadow-xl p-5"
              onClick={(e)=>e.stopPropagation()}
            >



              {/* Search Input */}

              <div className="flex items-center gap-3 border rounded-xl px-3 py-2">


                <i className="ri-search-line"></i>


                <input
                  autoFocus
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  className="outline-none w-full"
                />


              </div>





              {/* Result */}

              <div className="mt-5">


                {
                  loading && 
                  <p className="text-center text-gray-500">
                    Searching...
                  </p>
                }
{/* -------------------------------------------search Card-------------------------------- */}
              <SearchCard />

                {
                  !loading && search && searchResult.length === 0 &&
                  (
                    <p className="text-center text-gray-500 mt-5">
                      No user found
                    </p>
                  )
                }



              </div>


            </div>


          </div>

        )
      }



    </div>

  )
}


export default SideDrawer;