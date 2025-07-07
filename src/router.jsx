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
      { path: "home/details/:id", element: <ProdactDetails /> },
      { path: "ForgitPassoword", element: <ForgitPassoword /> },
      { path: "sendcode", element: <SendCode /> },
    ],
  },
]);

export default router;
