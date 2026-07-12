import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoutes = ({children}) => {

    const {isAuthenticated , user} = useSelector((state)=> state.auth);
    if(!isAuthenticated){
        return <Navigate to={"/"} />
    }
  return children;
}

export default ProtectedRoutes
