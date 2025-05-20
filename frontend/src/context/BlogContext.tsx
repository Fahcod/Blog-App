import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../features/blogSlice";
import { axiosInstance } from "../utils/axios"
import { setUser } from "../features/userSlice";

export const BlogContext = createContext({});

const BlogContextProvider = (props:any)=>{

    const dispatch = useDispatch();
    //Fetch the blogs
    const fetchBlogs = async () =>{
    
        let response = await axiosInstance.get('/api/v1/blogs/get');
        if(response.data.success){
            dispatch(setBlogs(response.data.data))
        }else{
            console.log("Error occured fetching blogs")
        }
    }

     // like the post
     const likePost = async (postId:any)=>{
     let response = await axiosInstance.put(`/api/v1/blogs/like/${postId}`);
     if(response.data.success){
      fetchBlogs();
     }else{
         console.log("Error liking post")
     }
     }

     //Fetch the blogs
    const fetchUser = async () =>{
    
        let response = await axiosInstance.get('/api/v1/user/get');
        if(response.data.success){
            dispatch(setUser(response.data.data))
            fetchBlogs()
        }else{
            console.log("Error occured fetching user")
        }
    }

    //Follow a user
    const followUser = async (userId:any) =>{
        let response = await axiosInstance.put(`/api/v1/user/follow/${userId}`);
        if(response.data.success){
            fetchUser();
        }else{
            console.log("Error occured following user")
        }
    }

    //updating the post views
    async function updateViews(blogId:string){
      let response = axiosInstance.put(`/api/v1/blogs/view/${blogId}`);
      if((await response).data.success){
        fetchBlogs();
      }else{
        return
      }
    }
 
    useEffect(()=>{
    fetchBlogs();
    fetchUser()
    },[]);

    const context_value:any={
    likePost,
    followUser,
    updateViews,
    fetchUser
    }

    return(
        <BlogContext.Provider value={context_value}>
            {props.children}
        </BlogContext.Provider>
    )

}

export default BlogContextProvider;