import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {useNavigate} from "react-router"


export const ChatContext = createContext()

export const ChatProvider = ({children})=>{ 
    
   
    

    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const [isEditOpen , setIsEditOpen] = useState(false);
      const [searchResult, setSearchResult] = useState([]);
      
      const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [chats , setChats] = useState([]);
      const [selectedChat , setSelectedChat] = useState(null);
      const [isGroupOpen , setIsGroupOpen] = useState(false);


      const [groupName, setGroupName] = useState("");
      const [groupSearch, setGroupSearch] = useState("");
      const [groupSearchResult, setGroupSearchResult] = useState([]);
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
      const [isViewMembersOpen, setIsViewMembersOpen] = useState(false);
      const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
      const [isRenameOpen, setIsRenameOpen] = useState(false);
      const [notification , setNotification] = useState([])
    












      return (
      <ChatContext.Provider value={{ isProfileOpen , setIsProfileOpen , isEditOpen , setIsEditOpen , searchResult, setSearchResult ,isSearchOpen, setIsSearchOpen , chats ,setChats , selectedChat ,setSelectedChat , isGroupOpen , 
        setIsGroupOpen,
        groupName,setGroupName,
        groupSearch, setGroupSearch,
        groupSearchResult, setGroupSearchResult,
        selectedUsers, setSelectedUsers,
        isGroupInfoOpen, setIsGroupInfoOpen,
        isViewMembersOpen, setIsViewMembersOpen,
        isAddMemberOpen, setIsAddMemberOpen,
        isRenameOpen, setIsRenameOpen,
        notification , setNotification

        
    }}>{children}</ChatContext.Provider>
      )
}


