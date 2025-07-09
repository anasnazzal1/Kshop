import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Component/User/ErrorPage/ErrorPage";
import Home from "./Pages/User/Home/Home";
import Cart from "./Pages/User/Cart/Cart";
import Register from "./Pages/User/Register/Register";
import MainLayout from "./Layout/MainLayout";
import Login from "./Pages/User/Login/Login";
import ProdactDetails from "./Pages/User/ProdactDetails/ProdactDetails";
import ForgitPassoword from "./Pages/User/ForgitPassoword/ForgitPassoword";
import SendCode from "./Pages/User/SendCode/SendCode";
import ProtactedRouter from "./Component/ProtactedRouter/ProtactedRouter";
import DashbordLayout from "./Layout/DashbordLayout";

import DashbordProtactedRouter from "./Component/ProtactedRouter/DashbordProtactedRouter";
import Dashbord from "./Pages/Admin/Dashbord/Dashbord";
import Profile from "./Pages/User/Profile/Profile";
import OrderDetails from "./Pages/User/OrderDetails/OrderDetails";
import ProdactOfCatgry from "./Pages/User/ProdactOfCatgry/ProdactOfCatgry";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: 
          // لحماية الصفحة من الوصول غير المصرح به
      <ProtactedRouter>
            <Cart />
      </ProtactedRouter>  },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home/details/:id", element: <ProdactDetails />,viewTransition: true  },
      { path: "ForgitPassoword", element: <ForgitPassoword /> },
       {path:"Profile", element:
        <ProtactedRouter>
          <Profile/>
        </ProtactedRouter>
       },
      { path: "sendcode", element: <SendCode /> },
      {path:"Profile/OrderDetails/:id",element:<OrderDetails/>},
      {path:"home/ProdactOfCatgry/:id",element:<ProdactOfCatgry/>}
      
    ],
  },
  {
     path: "/dashbord",
    element:
    
    <DashbordProtactedRouter>
      <DashbordLayout />
    </DashbordProtactedRouter>
    ,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element:<Dashbord/> },

    ]
  }
]);

export default router;
