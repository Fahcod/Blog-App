import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";


const AllBlogs = () => {

  const blogs:any[]=useSelector((state:any)=>state.blogs.all_blogs);

  return (
    <div className="w-[95%] md:w-[80%] mx-auto mt-5">
    <div className="w-full flex items-center justify-between">
    <h2 className="font-[Rubik-Bold] md:border-solid md:border-b-[3px] md:border-white pb-2 text-xl text-white">Blogs <span className="text-[#db1298]">for you</span></h2>
    <p className="font-[Rubik-Bold] cursor-pointer text-blue-500">view all</p>
    </div>
    <div className="w-full flex flex-row flex-wrap-reverse justify-between">
    {blogs.map((item,index)=>{
    return <BlogCard key={index} {...item}/>
   })}
    </div>
    </div>
  )
}

export default AllBlogs;