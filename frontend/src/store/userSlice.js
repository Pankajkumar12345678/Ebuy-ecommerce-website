import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails : (state,action)=>{
            state.user=action.payload
            console.log("UserDetails",action.payload)  // print user all details in console
        }
    }
})

// action creators are generated for each case reducer funtion

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer