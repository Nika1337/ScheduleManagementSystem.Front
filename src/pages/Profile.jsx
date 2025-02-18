import { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Avatar } from "@mui/material";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useAppContext } from "../context/AppContext.jsx";

const Profile = () => {
    const { user, setUser } = useAppContext();
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(user.avatar || null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setUser({ ...user, avatar: file });
        }
    };

    const handleSaveChanges = () => {
        console.log("Updated User Info:", user);
        console.log("Profile Image File:", user.avatar);
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "40px" }}>
            <Paper sx={{ padding: 3, boxShadow: 3, textAlign: "center" }}>
                <Avatar
                    src={profileImage}
                    alt={`${user.firstName} ${user.surname}`}
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                />

                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Profile Settings
                </Typography>

                <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>

                <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
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

            {/* Change Password Modal */}
            <ChangePasswordModal open={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
        </Container>
    );
};

export default Profile;
