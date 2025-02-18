import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const Login = () => {
    const { loginUser, loginError } = useAppContext(); // Use global auth function
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        const success = loginUser(email, password); // Call login function from context
        if (success) {
            navigate("/"); // Redirect to homepage on success
        } else {
            setError("Invalid email or password.");
        }
    };

    // Handle "Enter" key press
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                {(error || loginError) && <Typography color="error">{error || loginError}</Typography>}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
                    onKeyDown={handleKeyDown} // Attach keydown listener to the form
                >
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
