import { Outlet } from "react-router-dom";
import Navbar from "../Component/User/Navbar/Navbar";
import Footer from "../Component/User/Footer/Footer";
import CartContextProvider from "../Context/CartContext";

function MainLayout(){


return(
    <>

         {/* لارسال بيانات من context الى navber */}
    <CartContextProvider>
    <Navbar/>
        <Outlet/>

    
   
    <Footer/>
    </CartContextProvider>
   
   
    
    </>
)

}
export default MainLayout;