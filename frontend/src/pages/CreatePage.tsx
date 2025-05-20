import { useState } from "react";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../utils/axios";
import BottomNav from "../components/ResponsiveComponents/BottemNav";


const CreatePage = () => {

  const [image,setImage]:any[]=useState("");

  const [postData,setPostData]=useState({
    title:"",
    description:"",
    category:"Education",
    image:"",
    author:""
  });

  const handleChange=(e:any)=>{
    setPostData({...postData,[e.target.name]:e.target.value});
  }

  // create the actual post
  const createPost=async ()=>{
    let response = await axiosInstance.post('/api/v1/blogs/create',postData);
    if(response.data.success){
      alert('Blog created successfully')
    }else{
      alert('An error occured')
    }
  }

  //upload the image
  const uploadImage = async ()=>{
    let formData = new FormData();
    formData.append("file",image);
    let response = await axiosInstance.post('/api/v1/files/upload',formData);
    if(response.data.success){
      postData["image"]=response.data.image_url;
      postData["author"]="68266209a48c950c85e495d9"
      createPost()
    }else{
      alert('An error occured')
    }
  }

  return (
    <>
    <Navbar/> 
    <div className="w-[95%] md:w-[80%] mx-auto flex pb-32">
    <div className="w-full md:w-[60%] mt-6">
    <label htmlFor="file" className="w-full">
    {image?<img src={URL.createObjectURL(image)} className="object-cover w-full h-[250px] md:h-[400px]"/>:
    <div className="w-full h-[250px] md:h-[400px] bg-white/20 flex justify-center items-center">
    <p className="font-[Rubik-Bold] text-lg md:text-2xl text-white/40">Click to upload an image</p>
    </div>
      }
    </label>
    <div className="w-full pt-5">
    <input type="text" onChange={handleChange} value={postData.title} name='title' placeholder="Type your title here" className="font-[Rubik-Light] outline-none p-2 w-full text-white bg-white/20"/>
    </div>
    <input type="file" name="file" id="file" onChange={(e:any)=>setImage(e.target.files[0])} hidden/>
    <div className="w-full mt-4">
    <textarea name="description" onChange={handleChange} value={postData.description} rows={10} placeholder="Type your description here" className="w-full p-3 font-[Rubik-light] bg-white/20 text-white outline-none"></textarea>
    </div>
    <div className="w-full flex gap-6 mt-6 items-center">
     <select onChange={handleChange} value={postData.category} name="category" className="outline-none font-[Rubik-Light] text-white bg-white/20 p-2 w-[50%]">
      <option value="Education">Education</option>
      <option value="Sports">Sports</option>
      <option value="Food">Food</option>
      <option value="Business">Business</option>
      <option value="Health">Health</option>
      <option value="Nature">Nature</option>
      <option value="Technology">Technology</option>
     </select>
    <button onClick={()=>uploadImage()} className="w-[50%] cursor-pointer p-2 font-[Rubik-light] bg-[#db1298] font-semibold text-white">Create post</button>
    </div>
    </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default CreatePage;
