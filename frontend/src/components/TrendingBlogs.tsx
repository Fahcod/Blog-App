import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const TrendingBlogs = () => {

  const blogs:any[]=useSelector((state:any)=>state.blogs.all_blogs);

  return (
    <div className="w-[95%] md:w-[80%] mx-auto mt-5">
    <div className="w-full flex items-center justify-between">
    <h2 className="font-[Rubik-Bold] md:border-solid md:border-b-[3px] md:border-[#fff] pb-2 text-xl text-white">Trending <span className="text-[#db1298]">posts</span></h2>
    <p className="font-[Rubik-Bold] cursor-pointer text-blue-500">view all</p>
    </div>
    <div className="w-full flex flex-row flex-wrap-reverse justify-between">
   {blogs.slice(-6).map((item,index)=>{
    return <BlogCard key={index} _id={item._id} title={item.title} description={item.description} image={item.image}/>
   })}
    </div>
    </div>
  )
}

export default TrendingBlogs;
