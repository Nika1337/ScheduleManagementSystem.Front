import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import theme from "./hooks/theme.js";
import Dashboard from "./pages/Dashboard.jsx";
import ScheduleChangeRequests from "./pages/ScheduleChangeRequests.jsx";
import Jobs from "./pages/Jobs.jsx";
import Employees from "./pages/Employees.jsx";
import Profile from "./pages/Profile.jsx";
import { AppProvider } from "./context/AppContext.jsx";

function App() {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <NavBar />
                    <Container sx={{ textAlign: "center", marginTop: 4 }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/schedule-change-requests" element={<ScheduleChangeRequests />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </Container>
                </Router>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
