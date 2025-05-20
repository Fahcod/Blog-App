import {BiEdit, BiHome, BiSearch} from "react-icons/bi"
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="w-full flex px-5 items-center justify-between md:hidden h-[60px] border-solid border-t-[1px] border-white/10 fixed bottom-0 bg-[#03040c]">
    
    <Link to="/">
    <div className="flex flex-col items-center">
    <BiHome className="text-white w-7 h-7"/>
    <p className="text-white text-xs">Home</p>
    </div>
    </Link>

    <Link to="/create">
    <div className="flex flex-col items-center">
    <BiEdit className="text-white w-7 h-7"/>
    <p className="text-white text-xs">Create</p>
    </div>
    </Link>

    <Link to="/">
    <div className="flex flex-col items-center">
    <BiSearch className="text-white w-7 h-7"/>
    <p className="text-white text-xs">Explore</p>
    </div>
    </Link>

    <Link to="/">
    <div className="flex flex-col items-center">
    <FaRegBookmark className="text-white w-6 h-6"/>
    <p className="text-white text-xs">Saved</p>
    </div>
    </Link>

    </div>
  )
}

export default BottomNav;
