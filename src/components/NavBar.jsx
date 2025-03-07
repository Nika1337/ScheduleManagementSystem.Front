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
import { getUserRole, isAuthenticated } from "../hooks/useAuth";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isProfileActive = location.pathname === "/profile";
    const [anchorElNav, setAnchorElNav] = useState(null);

    const userRole = getUserRole();
    const isLoggedIn = isAuthenticated();

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const pages = [
        { name: "Dashboard", path: "/", allowedRoles: ["Admin", "Worker"] },
        { name: "Pending Schedule Changes", path: "/pending-schedule-changes", allowedRoles: ["Admin", "Worker"] },
        { name: "Jobs", path: "/jobs", allowedRoles: ["Admin"] },
        { name: "Workers", path: "/workers", allowedRoles: ["Admin"] },
    ];

    const visiblePages = pages.filter(page => userRole && page.allowedRoles.includes(userRole));

    if (!isLoggedIn) return null;

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
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                                    {visiblePages.map(({ name, path }) => (
                                        <MenuItem key={name} onClick={handleCloseNavMenu}>
                                            <NavLink to={path} style={{ textDecoration: "none", width: "100%" }}>
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

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    justifyContent: "center",
                                    gap: 1,
                                    flexWrap: "nowrap",
                                    overflow: "hidden",
                                }}
                            >
                                {visiblePages.map(({ name, path }) => (
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
                                                    minWidth: "120px",
                                                    maxWidth: "220px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
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

                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton sx={{ p: 0 }} onClick={() => navigate("/profile")}>
                                    <Avatar
                                        alt="User"
                                        src="/static/images/avatar/default.png"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            boxShadow: isProfileActive
                                                ? `0px 0px 2px 3px ${theme.palette.secondary.main}`
                                                : "none",
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
