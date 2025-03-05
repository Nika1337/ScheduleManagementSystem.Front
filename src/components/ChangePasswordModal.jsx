import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import { changePassword } from "../services/auth";
import { getToken } from "../hooks/useAuth";

const ChangePasswordModal = ({ open, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (open) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
            setSuccessMessage("");
        }
    }, [open]);

    const validatePassword = (password) => {
        if (!password || password.trim() === "") return "Password cannot be empty.";
        if (password.length < 8) return "Password must be at least 8 characters long.";
        if (!/\d/.test(password)) return "Password must contain at least one digit ('0'-'9').";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter ('a'-'z').";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter ('A'-'Z').";
        if (!/[\W_]/.test(password)) return "Password must contain at least one non-alphanumeric character.";
        if ([...new Set(password)].length === 1) return "Password must contain at least one unique character.";
        return "";
    };

    const handleNewPasswordChange = (e) => {
        const newPass = e.target.value;
        setNewPassword(newPass);
        setError(validatePassword(newPass));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSavePassword = async () => {
        setError("");
        setSuccessMessage("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const validationError = validatePassword(newPassword);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await changePassword(currentPassword, newPassword, getToken()); // Send request
            setSuccessMessage("Password changed successfully!");
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            console.error("Password change failed:", err);
            if (err.response?.status === 400 && err.response.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to change password. Please try again.");
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    error={!!error}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!error}
                />

                {error && <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>{error}</Typography>}
                {successMessage && <Typography color="success" sx={{ mt: 2, textAlign: "center" }}>{successMessage}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSavePassword}
                    color="primary"
                    variant="contained"
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                    Save Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordModal;
