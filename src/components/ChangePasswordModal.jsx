import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const ChangePasswordModal = ({ open, onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (open) {
            setPassword("");
            setConfirmPassword("");
            setError("");
            setPasswordError("");
        }
    }, [open]);

    const validatePassword = (password) => {
        const minLength = /.{6,}/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasDigit = /\d/;
        const hasSpecialChar = /[\W_]/;

        if (!minLength.test(password)) return "Password must be at least 6 characters long.";
        if (!hasUpperCase.test(password)) return "Password must contain at least one uppercase letter.";
        if (!hasLowerCase.test(password)) return "Password must contain at least one lowercase letter.";
        if (!hasDigit.test(password)) return "Password must contain at least one digit.";
        if (!hasSpecialChar.test(password)) return "Password must contain at least one special character.";
        return "";
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSavePassword = () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (passwordError) {
            setError(passwordError);
            return;
        }

        console.log("New Password Set:", "Updated");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordError}
                    helperText={passwordError}
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
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSavePassword}
                    color="primary"
                    variant="contained"
                    disabled={!password || !confirmPassword}
                >
                    Save Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordModal;
