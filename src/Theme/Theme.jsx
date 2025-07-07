import { createTheme } from '@mui/material/styles';

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,

      ...(mode === 'light'
        ? {
            // Light Mode
            primary: {
              main: '#1976d2',
            },
            secondary: {
              main: '#f50057',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#000000',
              secondary: '#333333',
            },
          }
        : {
            // Dark Mode
            primary: {
              main: '#90caf9',
            },
            secondary: {
              main: '#f48fb1',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#bbbbbb',
            },
          }),
    },

    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: '#fff',
            backgroundColor: mode === 'dark' ? '#1976d2' : '#1976d2',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#1565c0' : '#1565c0',
            },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#1976d2' : '#1f1f1f',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      },
    },
  });

export default theme;
