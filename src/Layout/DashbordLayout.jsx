import { Outlet } from "react-router-dom";
import Navbar from "../Component/User/Navbar/Navbar";
import Footer from "../Component/User/Footer/Footer";


function DashbordLayout(){



return(
    <>

      
  
  <Navbar/>
   <Outlet/>

    
   
    <Footer/>
   
   
    
    </>
)

}
export default DashbordLayout;