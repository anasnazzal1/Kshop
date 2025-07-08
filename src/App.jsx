import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { CssBaseline } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
const queryClient = new QueryClient();

  return (
    <>
    {/* to catch data by react query(tan stack) */}
    <QueryClientProvider client={queryClient}>
        {/* router */}
          <RouterProvider router={router} />
          {/* لالغاء الحواف للnavbar وغيره */}
          <CssBaseline /> 
          {/* dev tool react query */}
          <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   

   
    </>
  )
}

export default App
