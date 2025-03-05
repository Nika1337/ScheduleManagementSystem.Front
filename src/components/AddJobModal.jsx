import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Alert } from "@mui/material";
import { addJob } from "../services/jobs";
import { getToken } from "../hooks/useAuth.js";

const AddJobModal = ({ open, onClose, onSuccess }) => {
    const [jobName, setJobName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setJobName("");
            setError("");
        }
    }, [open]);

    const handleSave = async () => {
        if (!jobName.trim()) return;
        setLoading(true);
        setError("");

        try {
            await addJob({ jobName: jobName.trim() }, getToken());
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Error adding job:", err);
            setError(err.response?.data?.error || "Failed to add job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Job</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    label="Job Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={loading || !jobName.trim()}
                >
                    {loading ? <CircularProgress size={24} /> : "Add Job"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddJobModal;
