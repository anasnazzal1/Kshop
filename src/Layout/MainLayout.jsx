import { Outlet } from "react-router";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

export default function MainLayout(){
    return (
        <>
       <Navbar/>
        <Outlet/>
       <Footer/>

        
        
        </>
    )
}