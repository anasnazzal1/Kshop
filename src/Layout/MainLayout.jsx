import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/User/Navbar/Navbar";
import Footer from "../Component/User/Footer/Footer";
import CartContextProvider from "../Context/CartContext";

function MainLayout(){
// اخفاء navbar في صفحة sendCode

const hidden = ["/sendCode"] ;
const location = useLocation();
console.log(location.pathname)
const hiddenPage = hidden.includes(location.pathname)


return(
    <>

         {/* لارسال بيانات من context الى navber */}
    <CartContextProvider>
   {hiddenPage? null:<Navbar/>}
        <Outlet/>

    
   
    <Footer/>
    </CartContextProvider>
   
   
    
    </>
)

}
export default MainLayout;