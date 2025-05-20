import { Link } from "react-router-dom";

const DetailCard = (props:any) => {
  console.log(props.title)
  return (
    <div className="w-full md:w-[340px]">
    <Link to={`/blog/${props._id}`}>
    <img src={props.image} className="h-[190px] rounded-md w-full object-cover"/>
    </Link>
    <h2 className="font-[Rubik-Light] font-semibold text-white text-md py-1">{props.title?.slice(0,44)}...</h2>
    <p className="text-sm font-[Rubik-Light] text-white/60">{props.description?.slice(0,120)}...</p>
    </div>
  )
}

export default DetailCard;