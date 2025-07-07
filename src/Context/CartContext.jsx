import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ErrorPage from "../Component/User/ErrorPage/ErrorPage";
import Loader from "../Component/User/Loader/Loader";


export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {

  const [counter, setCounter] = useState(0);
  const [IsLoading, SetISLoading] = useState(true);
  const [IsError, SetIsError] = useState(false);
    const token = localStorage.getItem("UserToken");
    const headers = {
    Authorization: `Bearer ${token}`,
  };

    const GetProdact = async () => {
  if (!token) return;
      
        try{
            const response = await axios.get("https://mytshop.runasp.net/api/Carts", {
        headers,
      });
      
      const data = response.data.cartResponse
      const newData = data.reduce((accumulator,currentValue)=>{
        return currentValue.count  + accumulator
      },0)
        setCounter(newData)
      
        }
        catch(error){
            SetIsError(true)
        }
        finally{
            SetISLoading(false)
        }

      
    
  };


  useEffect(()=>{
    GetProdact()
  },[])

  if(IsError) return <ErrorPage/>



  return (
    <CartContext.Provider value={{ counter, setCounter }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
