import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress } from "@mui/material";
import { PART_OF_DAY_OPTIONS } from "../constants/partOfDay";
import { changeSchedule } from "../services/schedules"; // ✅ Import update service
import { getToken } from "../hooks/useAuth";

const ScheduleDetailsModal = ({ schedule, open, onClose, onSuccess }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPartOfDay, setSelectedPartOfDay] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (schedule) {
            setSelectedDate(schedule.date || "");
            setSelectedPartOfDay(schedule.partOfDay || "");
        }
    }, [schedule]);

    const handleUpdate = async () => {
        setLoading(true);
        setError("");

        try {
            const updatedSchedule = {
                ...schedule,
                date: selectedDate,
                partOfDay: selectedPartOfDay,
            };

            await changeSchedule(schedule.id, updatedSchedule, getToken()); // ✅ API call

            if (onSuccess) onSuccess(); // ✅ Call success callback (if provided)
            onClose(); // ✅ Close modal
        } catch (err) {
            console.error("Failed to update schedule:", err);
            setError("Failed to update schedule. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Schedule Details</DialogTitle>
            <DialogContent>
                <TextField
                    label="Job"
                    value={schedule?.jobName || "No Job"}
                    fullWidth
                    margin="dense"
                    disabled
                />
                <TextField
                    label="Worker"
                    value={`${schedule?.workerFirstName || "Unknown"} ${schedule?.workerLastName || ""}`}
                    fullWidth
                    margin="dense"
                    disabled
                />
                <TextField
                    label="Date"
                    type="date"
                    value={selectedDate}
                    fullWidth
                    margin="dense"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    select
                    label="Part of Day"
                    value={selectedPartOfDay}
                    fullWidth
                    margin="dense"
                    onChange={(e) => setSelectedPartOfDay(Number(e.target.value))}
                >
                    {PART_OF_DAY_OPTIONS.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>Cancel</Button>
                <Button onClick={handleUpdate} color="primary" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDetailsModal;
