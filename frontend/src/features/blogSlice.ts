import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name:'blogs',
    initialState:{
    all_blogs:[]
    },
    reducers:{
     setBlogs:(state:any,action:any)=>{ 
     state.all_blogs=action.payload
     }
    }
});

export const {setBlogs} = blogSlice.actions;
export default blogSlice.reducer