import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { images } from "../assets/assets";
import {BiLike,BiDislike,BiComment} from "react-icons/bi";
import DetailCard from "./DetailCard";
import { useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import BottomNav from "../components/ResponsiveComponents/BottemNav";
import Footer from "../components/Footer";


const DetailsPage = () => {

    const {blogId}=useParams();
    const blogs:any[]=useSelector((state:any)=>state.blogs.all_blogs);
    const activeBlog=blogs.find(e=>e._id === blogId);
    const {likePost,followUser,updateViews}:any = useContext(BlogContext);
    const user = useSelector((state:any)=>state.user.user_data);
    
    useEffect(()=>{
    updateViews(activeBlog?._id);
    },[]);

  return (
    <>
    <Navbar/>
    <div className="w-[95%] md:w-[80%] mx-auto pb-16 md:pb-11 flex gap-11 md:flex-row flex-col pt-4">
    {/* the left congtainer */}
    <div className="w-full md:w-[65%]">
    <img src={activeBlog?.image} className="w-full h-[250px] md:h-[400px] rounded-md object-cover"/>
     {/* details */}
    <div className="w-full pb-11">
    <h2 className="font-[Rubik-Bold] py-2 text-white text-xl">{activeBlog?.title}</h2>
    <p className="text-white/60 font-[Rubik-Light]">{activeBlog?.description}</p>
    <hr className="my-3 outline-none border-none h-[1px] bg-white/10"/>
    <div className="w-full flex items-center py-3 justify-between">
    <div className="md:flex hidden items-center gap-2">
    <div>
    <img src={images.image1} className="w-[39px] h-[39px] md:w-11 md:h-11 rounded-full object-cover"/>
    </div>
    <div className="">
    <h3 className="font-[Rubik-Bold] text-sm md:text-[auto] text-white">Twesigye Fahad</h3>
    <p className="text-white/60 text-xs font-[Rubik-Light]">{activeBlog?.views.length} views 3d ago</p>
     </div>
    </div>
    <div className="flex items-center gap-4 md:gap-8">
    <div onClick={()=>{
      likePost(activeBlog?._id);
      }} className="flex items-center gap-1 cursor-pointer">
    <BiLike className="w-6 h-6 text-white/40"/>
    <p className="text-sm text-white/80">{activeBlog?.likes.length}</p>
    </div>
    <div className="flex items-center gap-1 cursor-pointer">
    <BiDislike className="w-6 h-6 text-white/40"/>
    <p className="text-sm text-white/80">0</p>
    </div>
    <div className="flex items-center gap-1 cursor-pointer">
    <BiComment className="w-6 h-6 text-white/40"/>
    <p className="text-sm text-white/80">{activeBlog?.comments.length}</p>
    </div>
    <div>
    <button onClick={()=>followUser(activeBlog?.author)} className="text-white md:block hidden font-semibold cursor-pointer font-[Rubik-Light] bg-[#db1298] py-2 px-5 rounded-full">{user?.following?.includes(activeBlog?.author)?'Following':'Follow'}</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    {/* END OF THE LEFT CONTAINER */}
    {/* the right container */}
    <div className="w-full md:w-[35%] flex flex-col gap-5">
     {blogs.map((item,index)=>{
      if(item.category === activeBlog?.category && item._id !== activeBlog._id){
      return <DetailCard key={index} _id={item._id} title={item.title} description={item.description} image={item.image}/>
      }
     })}
    </div>
    </div>
    <Footer/>
    <BottomNav/>
    </>
  )
}

export default DetailsPage;
