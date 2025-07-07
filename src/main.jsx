import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/Theme.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // مهم جدًا
import ThemeContextProvider from './Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  // to theme
   
  <ThemeContextProvider>
       <App />
    {/* to tostify */}
       <ToastContainer /> 
    
  </ThemeContextProvider>
   
       


)
