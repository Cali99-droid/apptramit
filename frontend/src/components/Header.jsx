import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAuth } from "../hooks/useAuth";
// const pages = ['consulta', 'solicitud'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Header = () => {
  const { user } = useAuth({ middleware: "" });
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            alignItems={"center"}
            flexGrow={1}
          >
            <Box>
              <img src="/img/escudo-removebg.png" width={80} />
            </Box>

            {/* <AdbIcon  */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              marginRight={10}
              alignItems={"center"}
            >
              <Typography
                variant="h9"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "fantasy  ",
                  // fontWeight: 700,

                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Municipalidad Distrital de Chaccho
              </Typography>
              <Typography
                fontSize={18}
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Satisfy",
                  // fontWeight: 700,

                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Servicio, compromiso y comunidad.
              </Typography>
            </Box>
          </Box>

          <Box
            display={"flex"}
            gap={5}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Link to={"/consulta"}>
              <Button variant="text" color="inherit" sx={{ fontWeight: 900 }}>
                Consulta
              </Button>
            </Link>
            <Link to={"/solicitud"}>
              <Button variant="text" color="inherit" sx={{ fontWeight: 900 }}>
                Solicitud de trámite
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/consulta"}>
                  <Button variant="text" color="inherit">
                    Consulta
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/solicitud"}>
                  <Button variant="text" color="inherit">
                    Solicitud de trámite
                  </Button>
                </Link>
              </MenuItem>
            </Menu>

            <Box marginLeft={10}>
              <Link href="/">
                <img src="/img/escudo-removebg.png" width={80} />
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }} ml={6}>
            {/* <Tooltip title="Open settings"><IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> </Tooltip>*/}

            {user ? (
              <Link to={"/auth/login"}>
                <Button
                  variant="text"
                  color="inherit"
                  endIcon={<DashboardIcon />}
                >
                  Oficina{" "}
                </Button>
              </Link>
            ) : (
              <Link to={"/auth/login"}>
                <Button
                  variant="text"
                  color="inherit"
                  endIcon={<LoginIcon />}
                  sx={{ fontWeight: 700 }}
                >
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
