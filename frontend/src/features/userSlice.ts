import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:'user',
    initialState:{
    user_data:{}
    },
    reducers:{
     setUser:(state,action)=>{
        state.user_data=action.payload
     }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer