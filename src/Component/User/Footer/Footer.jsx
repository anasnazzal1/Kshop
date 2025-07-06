import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? '#f5f5f5' : '#222',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Anas Nazzal. All rights reserved.
        </Typography>
       
      </Container>
    </Box>
  );
}

export default Footer;
