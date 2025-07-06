import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // أو 'dark'
    primary: {
      main: '#1976d2', // اللون الأساسي
    },
    secondary: {
      main: '#f50057', // اللون الثانوي
    },
    background: {
      default: '#f5f5f5', // خلفية الصفحة
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', // عدم جعل الحروف كبيرة تلقائيًا
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // كل الأزرار دائرية
        },
      },
    },
  },
});

export default theme;
