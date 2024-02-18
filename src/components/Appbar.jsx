import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSnackbar } from "../context/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import { AdbRounded, Create, Home } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../global/auth.js";

export default function Appbar() {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(() => null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  async function logOut() {
    dispatch(logout());
    navigate("/auth/signin");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbRounded sx={{ mr: 2, display: { xs: "none", md: "block" } }} />
            <Box
              sx={{
                display: {
                  md: "none",
                },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuList sx={{ width: 200 }}>
                  <ListItemButton
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/");
                    }}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Home fontSize="small" />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/employee/new");
                    }}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Create fontSize="small" />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItemButton>
                </MenuList>
              </Menu>
            </Box>
            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              MyApp
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", gap: 3 },
              }}
            >
              <Button
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => navigate("/employee/new")}
              >
                Create
              </Button>
            </Box>
            <Button color="inherit" onClick={logOut} sx={{ ml: "auto" }}>
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
