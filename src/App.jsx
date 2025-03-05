import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import theme from "./hooks/theme.js";
import Dashboard from "./pages/Dashboard.jsx";
import PendingScheduleChanges from "./pages/PendingScheduleChanges.jsx";
import Jobs from "./pages/Jobs.jsx";
import Workers from "./pages/Workers.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./hooks/useAuth";
import './styles/styles.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

const AppContent = () => {
    const { authenticated } = useAuth();

    return (
        <>
            {authenticated && window.location.pathname !== "/login" && <NavBar />}
            <Container sx={{ textAlign: "center", marginTop: 4 }}>
                <Routes>
                    <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/pending-schedule-changes" element={<PrivateRoute allowedRoles={["Admin", "Worker"]}><PendingScheduleChanges /></PrivateRoute>} />
                    <Route path="/jobs" element={<PrivateRoute allowedRoles={["Admin"]}><Jobs /></PrivateRoute>} />
                    <Route path="/workers" element={<PrivateRoute allowedRoles={["Admin"]}><Workers /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute allowedRoles={["Worker", "Admin"]}><Profile /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to={authenticated ? "/" : "/login"} />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
