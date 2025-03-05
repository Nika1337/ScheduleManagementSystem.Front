import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import { changeEmail } from "../services/auth";
import { getToken } from "../hooks/useAuth";

const ChangeEmailModal = ({ open, onClose }) => {
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (open) {
            setNewEmail("");
            setConfirmEmail("");
            setError("");
            setSuccessMessage("");
        }
    }, [open]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "" : "Invalid email format.";
    };

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
        setError(validateEmail(e.target.value));
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };

    const handleSaveEmail = async () => {
        setError("");
        setSuccessMessage("");

        if (newEmail !== confirmEmail) {
            setError("Email addresses do not match!");
            return;
        }

        const validationError = validateEmail(newEmail);
        if (validationError) {
            setError(validationError);
            return;
        }

        await changeEmail(newEmail, getToken()); // Send request
        setSuccessMessage("Email changed successfully!");

        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Change Email</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="New Email"
                    type="email"
                    variant="outlined"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    error={!!error}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Confirm New Email"
                    type="email"
                    variant="outlined"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
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
                    onClick={handleSaveEmail}
                    color="primary"
                    variant="contained"
                    disabled={!newEmail || !confirmEmail}
                >
                    Save Email
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangeEmailModal;
