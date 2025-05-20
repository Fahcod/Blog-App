import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {

  const User = useSelector((state:any)=>state.user.user_data);

  return (
    <div className="sticky top-0 z-[100] w-full flex justify-center bg-[#03040c] border-solid border-b-[1px] border-white/10">
    <div className="w-[95%] md:w-[80%] flex items-center h-[60px] justify-between">
    <h2 className="font-[Rubik-Bold] text-white italic text-2xl">Blog<span className="text-[#db1298]">spot</span></h2>
    <div className="flex items-center gap-11">
    <ul className="text-white hidden md:block">
    <Link to="/">
    <li className="inline font-[Rubik-Light] hover:text-[#db1298] cursor-pointer font-semibold text-md px-8">Home</li>
    </Link>
     <Link to="/create">
    <li className="inline font-[Rubik-Light] hover:text-[#db1298] cursor-pointer font-semibold text-md px-8">Create</li>
    </Link>
    <li className="inline font-[Rubik-Light] hover:text-[#db1298] cursor-pointer font-semibold text-md px-8">Explore</li>
    <li className="inline font-[Rubik-Light] hover:text-[#db1298] cursor-pointer font-semibold text-md px-8">Bookmarks</li>
    <li className="inline font-[Rubik-Light] hover:text-[#db1298] cursor-pointer font-semibold text-md px-8">About</li>
    </ul>
    <Link to="/me">
    <div>
    <img src={User?.profile} className="w-[40px] h-[40px] rounded-full object-cover"/>
    </div>
    </Link>
    </div>
    </div>
    </div>
  )
}

export default Navbar;
