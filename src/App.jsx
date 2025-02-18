import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import theme from "./hooks/theme.js";
import Dashboard from "./pages/Dashboard.jsx";
import ScheduleChangeRequests from "./pages/ScheduleChangeRequests.jsx";
import Jobs from "./pages/Jobs.jsx";
import Employees from "./pages/Employees.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import { useAppContext } from "./context/AppContext";

function App() {
    const { user } = useAppContext(); // Get logged-in user

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                {/* Show navbar only when user is logged in and not on login page */}
                {user && window.location.pathname !== "/login" && <NavBar />}

                <Container sx={{ textAlign: "center", marginTop: 4 }}>
                    <Routes>
                        {/* Redirect logged-in users away from login page */}
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

                        {/* Protected Routes */}
                        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/schedule-change-requests" element={user ? <ScheduleChangeRequests /> : <Navigate to="/login" />} />
                        <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
                        <Route path="/employees" element={user ? <Employees /> : <Navigate to="/login" />} />
                        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

                        {/* Catch all unknown routes and redirect to login or dashboard */}
                        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
