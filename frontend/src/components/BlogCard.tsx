import { Link } from "react-router-dom";

const BlogCard = (props:any) => {
  return (
    <div className="w-full md:w-[340px] mt-7 md:mt-11">
    <Link to={`/blog/${props._id}`}>
    <img src={props.image} className="h-[200px] w-full object-cover rounded-md"/>
    </Link>
    <h2 className="text-white font-[Rubik-Light] font-semibold text-md py-1">{props.title?.slice(0,44)}...</h2>
    <p className="text-sm font-[Rubik-Light] text-white/60">{props.description?.slice(0,114)}...</p>
    </div>
  )
}

export default BlogCard;
