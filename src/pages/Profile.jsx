import { useState, useRef } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Avatar } from "@mui/material";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, setUser, logoutUser } = useAppContext();
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser({ ...user, avatar: imageUrl }); // Update global user context
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSaveChanges = () => {
        console.log("Updated User Info:", user);
        console.log("Profile Image File:", user.avatar);
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "40px" }}>
            <Paper sx={{ padding: 3, boxShadow: 3, textAlign: "center" }}>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <Avatar
                    src={user.avatar}
                    alt={`${user.firstName} ${user.surname}`}
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2, cursor: "pointer" }}
                    onClick={handleAvatarClick}
                />

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
                    <Button
                        variant="text"
                        color="error"
                        fullWidth
                        sx={{ marginTop: 2, fontWeight: "bold" }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Paper>

            <ChangePasswordModal open={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
        </Container>
    );
};

export default Profile;
