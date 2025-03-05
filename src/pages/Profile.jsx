import { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeEmailModal from "../components/ChangeEmailModal";
import { getUserRole, getUserEmail, getToken, useAuth } from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/profile"; // ✅ Import updateProfile

const Profile = () => {
    const { logout } = useAuth();
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const userEmail = getUserEmail();
    const userRole = getUserRole();
    const isAdmin = userRole === "Admin";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (!isAdmin) {
            const loadProfile = async () => {
                try {
                    const profileData = await getProfile(getToken());
                    setFirstName(profileData.firstName || "");
                    setLastName(profileData.lastName || "");
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                } finally {
                    setLoading(false);
                }
            };
            loadProfile();
        } else {
            setFirstName("Admin");
            setLastName("Admin");
            setLoading(false);
        }
    }, [isAdmin]);

    const handleSaveChanges = async () => {
        try {
            await updateProfile({ firstName, lastName }, getToken()); // ✅ Send updated data to backend
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ paddingTop: "40px", textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "40px" }}>
            <Paper sx={{ padding: 3, boxShadow: 3, textAlign: "center" }}>
                <Avatar
                    src="/static/images/avatar/default.png"
                    alt="User"
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        InputProps={{ readOnly: isAdmin }} // ✅ Editable for non-admins
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        InputProps={{ readOnly: isAdmin }} // ✅ Editable for non-admins
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={userEmail}
                        InputProps={{ readOnly: true }}
                    />

                    {!isAdmin && (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            onClick={handleSaveChanges} // ✅ Calls API to update profile
                        >
                            Save Changes
                        </Button>
                    )}

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
                        color="info"
                        fullWidth
                        sx={{ marginTop: 1, fontWeight: "bold" }}
                        onClick={() => setEmailModalOpen(true)}
                    >
                        Change Email
                    </Button>

                    <Button
                        variant="text"
                        color="error"
                        fullWidth
                        sx={{ marginTop: 2, fontWeight: "bold" }}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Box>
            </Paper>

            <ChangePasswordModal open={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
            <ChangeEmailModal open={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} />
        </Container>
    );
};

export default Profile;
