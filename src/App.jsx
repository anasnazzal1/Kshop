import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { CssBaseline } from '@mui/material';


function App() {


  return (
    <>
     {/* router */}
    <RouterProvider router={router} />
    {/* لالغاء الحواف للnavbar وغيره */}
     <CssBaseline /> 

   
    </>
  )
}

export default App
