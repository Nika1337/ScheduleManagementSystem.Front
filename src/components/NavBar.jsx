import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, Paper } from "@mui/material";

const pages = [
    { name: "Dashboard", path: "/" },
    { name: "Schedule Change Requests", path: "/schedule-change-requests" },
    { name: "Jobs", path: "/jobs" },
    { name: "Employees", path: "/employees" },
];

function NavBar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isProfileActive = location.pathname === "/profile";
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "16px" }}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: "#EEEEEE",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "1200px",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="xl">
                    <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                        <Toolbar disableGutters>
                            {/* Mobile Menu */}
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
                                <IconButton
                                    size="large"
                                    aria-label="menu"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    keepMounted
                                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                >
                                    {pages.map(({ name, path }) => (
                                        <MenuItem key={name} onClick={handleCloseNavMenu}>
                                            <NavLink
                                                to={path}
                                                style={{ textDecoration: "none", width: "100%" }}
                                            >
                                                {({ isActive }) => (
                                                    <Button
                                                        fullWidth
                                                        sx={{
                                                            borderRadius: "20px",
                                                            backgroundColor: isActive ? theme.palette.primary.main : "white",
                                                            color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                                            "&:hover": {
                                                                backgroundColor: isActive ? theme.palette.primary.main : theme.palette.background.default,
                                                            },
                                                        }}
                                                    >
                                                        {name}
                                                    </Button>
                                                )}
                                            </NavLink>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            {/* Desktop Menu */}
                            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center", gap: 2 }}>
                                {pages.map(({ name, path }) => (
                                    <NavLink key={name} to={path} style={{ textDecoration: "none" }}>
                                        {({ isActive }) => (
                                            <Button
                                                sx={{
                                                    position: "relative",
                                                    borderRadius: "20px",
                                                    backgroundColor: isActive ? theme.palette.primary.main : "white",
                                                    color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                                    "&:hover": {
                                                        backgroundColor: isActive ? theme.palette.primary.main : theme.palette.background.default,
                                                    },
                                                    paddingBottom: "6px",
                                                    minWidth: "100px",
                                                }}
                                            >
                                                {name}
                                                {isActive && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: "4px",
                                                            left: "50%",
                                                            transform: "translateX(-50%)",
                                                            height: "4px",
                                                            width: "30%",
                                                            backgroundColor: theme.palette.secondary.main,
                                                            borderRadius: "2px",
                                                        }}
                                                    />
                                                )}
                                            </Button>
                                        )}
                                    </NavLink>
                                ))}
                            </Box>

                            {/* Profile Icon */}
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton sx={{ p: 0 }} onClick={() => navigate("/profile")}>
                                    <Avatar
                                        alt="User"
                                        src="/static/images/avatar/2.jpg"
                                        sx={{
                                            border: isProfileActive ? `3px solid ${theme.palette.primary.main}` : "none",
                                            padding: isProfileActive ? "3px" : "0",
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Container>
            </Paper>
        </Box>
    );
}

export default NavBar;
