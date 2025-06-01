import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      
    },
    // يمكنك تخصيص باقي العناصر مثل h2, body1, ... إلخ
  },
});

export default theme;