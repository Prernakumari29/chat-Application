import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuthenticated:false
    },
    reducers:{
        setUser:(state , action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;        
        },
        updateUser:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
           state.user = null;
           state.isAuthenticated = false;
        }
    }
})

export const {setUser , logout , updateUser} = authSlice.actions;
export default authSlice.reducer;