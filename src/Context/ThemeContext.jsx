
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ErrorPage from "../Component/User/ErrorPage/ErrorPage";
import Loader from "../Component/User/Loader/Loader";
import theme from "../Theme/Theme";
import { ThemeProvider } from "@emotion/react";


export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {

  const [mode, setMode] = useState("light");
     const currentmode = theme(mode)

    const toogleMode =()=>{
        setMode((prev)=>prev=="light"?"dark":"light");
    }
   

 


  return (
  
    <ThemeContext.Provider value={{ mode, toogleMode }}>
          <ThemeProvider theme={currentmode}>
         {children}
    </ThemeProvider>
    
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
