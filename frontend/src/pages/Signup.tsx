import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

const Signup = () => {

  const navigate = useNavigate();

  const [formData,setFormData]=useState({
  fullname:"",
  username:"",
  email:"",
  password:""
  });

  const {fetchUser}:any=useContext(BlogContext)

  const handleChange=(e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const submitData = async () =>{
    let response=await axiosInstance.post('/api/v1/user/signup',formData);
    if(response.data.success){
      fetchUser()
      navigate("/")
      setFormData({
        fullname:"",
        username:"",
        email:"",
        password:""
      });
    }else{
      alert("Account creation failed")
    }
  }

  return (
    <>
    <div className="w-full h-screen flex items-center justify-center">
    {/* the form */}
    <div className="w-[390px] pb-7 bg-white shadow-md rounded-md">
    <div>
      <h2 className="font-[Rubik-Bold] text-xl py-3 text-center">Signup for Blogspot</h2>
    </div>
    {/* the fields */}
    <div className="w-full flex flex-col gap-7 pl-[9%] pt-3">
    
    <div className="w-[90%]">
      <input type="text" onChange={handleChange} value={formData.fullname} name="fullname" className="rounded-md w-full p-2 border-solid border-[1px] outline-none border-[#cacaca] full_name" placeholder="Enter your Full name" autoComplete="off"/>
      <p className=""></p>
    </div>

     <div className="w-[90%]">
      <input type="text" onChange={handleChange} value={formData.username} name="username" className="rounded-md w-full p-2 border-solid border-[1px] outline-none border-[#cacaca] full_name" placeholder="Enter your username" autoComplete="off"/>
      <p className=""></p>
    </div>

     <div className="w-[90%]">
      <input type="email" onChange={handleChange} value={formData.email} name="email" className="rounded-md w-full p-2 border-solid border-[1px] outline-none border-[#cacaca] full_name" placeholder="Enter your email" autoComplete="off"/>
      <p className=""></p>
    </div>

     <div className="w-[90%]">
      <input type="password" onChange={handleChange} value={formData.password} name="password" className="rounded-md w-full p-2 border-solid border-[1px] outline-none border-[#cacaca] full_name" placeholder="Enter your password" autoComplete="off"/>
      <p className=""></p>
    </div>

    <div className="w-[90%]">
     <button onClick={()=>submitData()} className="w-full p-2 text-white rounded-md bg-[#000] font-semibold font-[Rubik-Light]">Submit</button>
    </div>

    <div>
      <p className="text-[#333]">Already have an account?<Link to="/login">Login</Link></p>
    </div>

    </div>
    </div>
    </div>
    </>
  )
}

export default Signup;
