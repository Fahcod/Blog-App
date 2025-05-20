import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import BottomNav from "../components/ResponsiveComponents/BottemNav";

const Profile = () => {

  const blogs = useSelector((state:any)=>state.blogs.all_blogs);
  const user = useSelector((state:any)=>state.user.user_data);

  return (
    <>
    <Navbar/>
    <div className="w-[95%] md:w-[80%] mx-auto pt-7 pb-24 md:pb-12">
    <div className="w-full flex justify-center">
    <div className="flex flex-col gap-3 items-center">
    <img src={user?.profile} className="w-[140px] h-[140px] rounded-full object-cover"/>
    <div className="flex flex-col items-center">
      <h2 className="font-[Rubik-Bold] text-xl text-white">{user?.fullname}</h2>
      <p className="text-white/60 font-[Rubik-light]">@{user?.username}</p>
    </div>
    </div>
    </div>
   <div className="w-full flex items-center md:gap-16 justify-between md:justify-center pt-6">
    <p className="text-white font-[Rubik-Light] text-sm cursor-pointer md:text-lg">Posts (4)</p>
    <p className="text-white font-[Rubik-Light] text-sm cursor-pointer md:text-lg">Following ({user?.following.length})</p>
    <p className="text-white font-[Rubik-Light] text-sm cursor-pointer md:text-lg">Followers ({user?.followers.length})</p>
    <p className="text-white font-[Rubik-Light] text-sm cursor-pointer md:text-lg">Likes(623k)</p>
   </div>
   <hr className="mt-3 outline-none border-none h-[1px] bg-white/20"/>
   <div className="w-full flex flex-row flex-wrap justify-between">
   {blogs.map((item:any,index:any)=>{
    if(item.author === user._id){
    return <BlogCard key={index} _id={item._id} title={item.title} description={item.description} image={item.image}/>
    }
   })}
   </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default Profile;
