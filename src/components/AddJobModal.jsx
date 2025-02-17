import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const AddJobModal = ({ open, onClose, onSave }) => {
    const [jobName, setJobName] = useState("");

    useEffect(() => {
        if (open) {
            setJobName("");
        }
    }, [open]);

    const handleSave = () => {
        if (!jobName.trim()) return;
        onSave(jobName.trim());
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Job</DialogTitle>
            <DialogContent>
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
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={!jobName.trim()}
                >
                    Add Job
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddJobModal;
