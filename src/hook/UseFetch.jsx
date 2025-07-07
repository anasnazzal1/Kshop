import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

function UseFetch(url) {

const [data,setData] = useState([]);
 const [isLoading,SetIsloading] = useState(true)
  const [isError, setError] = useState(false);
const getData= async()=>{
      try {
const {data} = await axios.get(url);
        setData(data);
      }
       catch (error) {
        setError(error)
    console.error("❌ Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || error.message, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
       }
       finally{
        SetIsloading(false)
       }

        

    }

    useEffect(()=>{
         getData();

},[])

return {data,isLoading,isError}

}

export default UseFetch;