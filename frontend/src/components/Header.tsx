import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SmallBox=(props:any)=>{
    return(
        <>
        <div className="h-[250px] w-full rounded-md relative overflow-hidden">
        <img src={props.image} className="h-full w-full object-cover rounded-md"/>
        {/* the cover */}
         <Link to={`/blog/${props?._id}`}>
        <div className="px-3 flex pb-7 flex-col justify-end absolute top-0 w-full h-full bg-[#00000088]">
        <h2 className="text-white font-semibold font-[Rubik-Light]">{props.title}</h2>
        <p className="text-white font-[Rubik-Light] text-sm">{props.description?.slice(0,90)}...</p>
        </div>
        </Link>
        </div>
        </>
    )
}

const Header = () => {

  const blogs:any[]=useSelector((state:any)=>state.blogs.all_blogs);
  const lastBlogs=blogs?.slice(-3);

  const firstBlog=lastBlogs[0];
  const secondBlog=lastBlogs[1];
  const thirdBlog=lastBlogs[2]

  const blogImtemOne={
    _id:secondBlog?._id,
    image:secondBlog?.image,
    title:secondBlog?.title,
    description:secondBlog?.description
  }

  const blogImtemTwo={
    _id:thirdBlog?._id,
    image:thirdBlog?.image,
    title:thirdBlog?.title,
    description:thirdBlog?.description
  }

  return (
    <div className="w-[95%] md:w-[80%] mx-auto mt-5 flex gap-2 h-[230px] md:h-[450px]">
    <div className="w-full md:w-[65%] h-full overflow-hidden relative rounded-md">
    <img src={firstBlog?.image} className="h-full object-cover w-full"/>
    <Link to={`/blog/${firstBlog?._id}`}>
    <div className="w-full h-full flex pb-11 flex-col justify-end bg-[#00000088] absolute top-0">
    <div className="w-[94%] md:w-[80%] md:px-5 px-2">
    <h2 className="font-[Rubik-Light] text-lg text-white font-semibold">{firstBlog?.title}</h2>
    <p className="text-white md:block hidden font-[Rubik-Light]">{firstBlog?.description?.slice(0,160)}...</p>
    </div>
    </div>
    </Link>
    </div>
    {/* the small images */}
    <div className="w-[35%] hidden md:flex flex-col gap-2">
    <SmallBox {...blogImtemOne}/>
    <SmallBox {...blogImtemTwo}/>
    </div>
    </div>
  )
}

export default Header
