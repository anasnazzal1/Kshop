import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.js'
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider  theme={theme}>
        <CssBaseline/>
           <App />


    </ThemeProvider>
  </StrictMode>,
)
