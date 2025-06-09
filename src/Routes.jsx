import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./Layout/MainLayout";
import ErrorPages from "./component/ErrorPage/ErrorPages";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgitPassword from "./pages/ForgitPassword/ForgitPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProdactDetails from "./pages/ProdactDetails/ProdactDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <ErrorPages/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
         {
            path:"/Home",
            element:<Home/>
        },
        {
           path:"/cart",
            element:<Cart/>
        },
        {
          path : "/Register",
        element:<Register/>
        },
        {
          path :"/Login",
          element:<Login/>
        },
        {
          path :"/forgitPassword",
          element:<ForgitPassword/>
        },
        {
          path:"/ResetPassword",
          element:<ResetPassword/>
        },
         {
          path:"/ProdactDetails/:id",
          element:<ProdactDetails/>
        }
    ]
  },
]);
export default router;
