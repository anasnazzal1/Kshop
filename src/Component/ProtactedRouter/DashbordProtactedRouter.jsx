import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function DashbordProtactedRouter({children}){
        const navigate = useNavigate()
        const token = localStorage.getItem("UserToken");
        const decode = jwtDecode(token);
        const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        console.log(decode)
        if(role == "SuperAdmin")
            return children
        else{
            toast.info('you not login in admin account', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
                  return <Navigate to="/login" />
                
        }
    
}
export default DashbordProtactedRouter;