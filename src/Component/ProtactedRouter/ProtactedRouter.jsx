import { Navigate, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function ProtactedRouter({children}){
        const navigate = useNavigate()

        if(localStorage.getItem("UserToken") != null){
            return children;
        }
        else{
            toast.info('please login to access to this page', {
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
export default ProtactedRouter;