import { configureStore } from "@reduxjs/toolkit";
import blogSliceReducer from '../features/blogSlice';
import userSliceReducer from "../features/userSlice"


export const store=configureStore({
    reducer:{
        blogs:blogSliceReducer,
        user:userSliceReducer
    }
})