import { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import ChangePasswordModal from "../components/ChangePasswordModal";

const mockUser = {
    firstName: "John",
    surname: "Doe",
    email: "john.doe@example.com",
};

const Profile = () => {
    const [user, setUser] = useState(mockUser);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        console.log("Updated User Info:", user);
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "40px" }}>
            <Paper sx={{ padding: 3, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Profile Settings
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="dense"
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Surname"
                        name="surname"
                        variant="outlined"
                        value={user.surname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                    <Button
                        variant="text"
                        color="warning"
                        fullWidth
                        sx={{ marginTop: 1, fontWeight: "bold" }}
                        onClick={() => setPasswordModalOpen(true)}
                    >
                        Change Password
                    </Button>
                </Box>
            </Paper>

            <ChangePasswordModal open={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
        </Container>
    );
};

export default Profile;
