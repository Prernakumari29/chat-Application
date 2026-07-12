import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {useNavigate} from "react-router"


export const ChatContext = createContext()

export const ChatProvider = ({children})=>{ 
    
   
    

    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const [isEditOpen , setIsEditOpen] = useState(false);












      return (
      <ChatContext.Provider value={{ isProfileOpen , setIsProfileOpen , isEditOpen , setIsEditOpen}}>{children}</ChatContext.Provider>
      )
}


