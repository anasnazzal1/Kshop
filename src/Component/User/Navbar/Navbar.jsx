import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';

const PagesUser = ["home", "cart", "logout"];
const pageGuest = ["home", 'Login', "register"];

function Navbar() {

  const cart = useContext(CartContext);
const queryClient = useQueryClient();

const counter = cart?.counter || 0; // افتراضي 0 لو كان null
  const { mode, toogleMode } = useContext(ThemeContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isLogin = Boolean(localStorage.getItem("UserToken"));
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out user...");
    localStorage.removeItem("UserToken");
    navigate("/home");
    console.log("User logged out and redirected to /home");
  };

  const handleOpenNavMenu = (event) => {
    console.log("Opening navigation menu");
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log("Opening user menu");
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    console.log("Closing navigation menu");
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    console.log("Closing user menu");
    setAnchorElUser(null);
  };

  console.log("Navbar render - isLogin:", isLogin, "cart counter:", counter, "theme mode:", mode);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            component={Link}
            to={"home"}
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Small screen menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {(isLogin ? PagesUser : pageGuest).map((page) => (
                <MenuItem
                  key={page}
                  onClick={page === "logout" ? () => { logout(); handleCloseNavMenu(); } : handleCloseNavMenu}
                  component={Link}
                  to={`/${page}`}
                >
                  <Typography textAlign="center" >
                    {isLogin && page === "cart" ? `cart (${counter})` : page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"home"}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Pages on large screen */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(isLogin ? PagesUser : pageGuest).map((page) =>
              page !== "logout" ? (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 0.5, 
                    color: mode === 'dark' ? 'white' : 'inherit',
                    backgroundColor: mode === 'dark' ? '#333' : 'transparent',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? '#555' : 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  {isLogin && page === "cart" ? `cart (${counter})` : page}
                </Button>
              ) : (
                <Button
                  key="logout"
                  onClick={() => {
                    logout();
                    handleCloseNavMenu();
                  }}
                  sx={{
                    my: 2,
                  mx: 0.5, 
                    color: mode === 'dark' ? 'white' : 'inherit',
                    backgroundColor: mode === 'dark' ? '#333' : 'transparent',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? '#555' : 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  Logout
                </Button>
              )
            )}
          </Box>

          {/* Toggle Theme + Avatar */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Toggle theme">
              <IconButton onClick={() => { 
                console.log("Toggling theme mode from", mode); 
                toogleMode(); 
              }} color="inherit">
                {mode === "light" ? (
                  <span style={{ fontSize: 18 }}>🌙</span>
                ) : (
                  <span style={{ fontSize: 18 }}>☀️</span>
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {['Profile',   'Logout'].map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    console.log("Clicked user menu item:", setting);
                    if (setting === "Logout") {
                      logout();
                    }
                    else if(setting === "Profile")
                    {
                      navigate("/Profile")
                    }
                   
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
