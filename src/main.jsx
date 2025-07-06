import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/Theme.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // مهم جدًا

createRoot(document.getElementById('root')).render(
  // to theme
   <ThemeProvider theme={theme}>
    <App />
    {/* to tostify */}
       <ToastContainer /> 
       
  </ThemeProvider>

)
