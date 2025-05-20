import AllBlogs from "../components/AllBlogs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BottomNav from "../components/ResponsiveComponents/BottemNav";
import TrendingBlogs from "../components/TrendingBlogs";


const HomePage = () => {
  return (
    <div className="md:pb-3 pb-24">
    <Navbar/>
    <Header/>
    <TrendingBlogs/>
    <AllBlogs/>
    <Footer/>
    <BottomNav/>
    </div>
  )
}

export default HomePage;
