import React from 'react'
import { useEffect } from 'react';
import apiInstance from '../services/Api';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const AuthLoader = ({children}) => {

    const dispatch = useDispatch();

    useEffect(()=>{

        const getCurrentUser = async ()=>{
            try {

                const res = await apiInstance.get("/auth/me");
                dispatch(setUser(res.data.data))
                
            } catch (error) {}
        }
        
        getCurrentUser();

    },[])


  return children;
}

export default AuthLoader;

