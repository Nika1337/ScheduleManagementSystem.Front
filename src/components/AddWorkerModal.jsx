import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Alert } from "@mui/material";
import { addWorker } from "../services/workers";
import {getToken} from "../hooks/useAuth.js";

const AddWorkerModal = ({ open, onClose, onSuccess }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setError("");
        }
    }, [open]);

    const handleSave = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await addWorker({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }, getToken());
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Error adding worker:", err);
            setError(err.response?.data?.error || "Failed to add worker.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Worker</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    label="First Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={loading || !firstName.trim() || !lastName.trim() || !email.trim()}>
                    {loading ? <CircularProgress size={24} /> : "Add Worker"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddWorkerModal;
