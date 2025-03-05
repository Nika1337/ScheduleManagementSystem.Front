import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Typography, Paper } from "@mui/material";
import { login } from "../services/auth";
import { setToken } from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const data = await login(email, password);
            setToken(data.token);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
                    onKeyDown={handleKeyDown}
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
                    {error && <Typography color="error">{error}</Typography>}
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
