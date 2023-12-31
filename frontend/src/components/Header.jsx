import { Link } from "react-router-dom";
import { AppBar,  Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from "../hooks/useAuth";
// const pages = ['consulta', 'solicitud'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Header = () => {
  const {user} = useAuth({middleware:''});
    const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            SISTRA
          </Typography>
         <Box display={'flex'} gap={2}sx={ {display: { xs: 'none', md: 'flex' }}}>
         <Link to={'/consulta'} >
                <Button variant='text'  color="inherit"  >
                    Consulta
                </Button>
                </Link>
                <Link to={'/solicitud'}>
                <Button variant='text'  color="inherit"  >
                    Solicitud de trámite
                    
                </Button>
                </Link>
         </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <MenuItem  onClick={handleCloseNavMenu} >
                <Link to={'/consulta'} >
                <Button variant='text'  color="inherit"  >
                    Consulta
                </Button>
                </Link>
               
                </MenuItem>
                <MenuItem>
                <Link to={'/solicitud'}>
                <Button variant='text'  color="inherit"  >
                    Solicitud de trámite
                    
                </Button>
                </Link>
                </MenuItem>
            
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            SISTRA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {/*   {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}*/}
          </Box> 

          <Box sx={{ flexGrow: 0 }}>
            
              {/* <Tooltip title="Open settings"><IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> </Tooltip>*/}
               
            {user?(
            <Link to={'/auth/login'}>
            <Button variant='text' color="inherit" endIcon={<DashboardIcon/>}>Oficina </Button>
            </Link>
            
            ):(
                    <Link to={'/auth/login'}>
                  
                <Button variant='text' color="inherit" endIcon={<LoginIcon/>} >
                    Acceder
                   
                </Button>
                </Link>
                  )}
                
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
