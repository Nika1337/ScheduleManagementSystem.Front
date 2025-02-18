import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Autocomplete } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const AddShiftModal = ({ open, onClose, onSave }) => {
    const { employees, roles, partsOfDay } = useAppContext();
    const [selectedWorker, setSelectedWorker] = useState("");
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPartOfDay, setSelectedPartOfDay] = useState("");

    useEffect(() => {
        if (open) {
            setSelectedWorker("");
            setSelectedJob("");
            setSelectedDate("");
            setSelectedPartOfDay("");
        }
    }, [open]);

    const handleSave = () => {
        if (!selectedWorker || !selectedJob || !selectedDate || !selectedPartOfDay) return;
        onSave({
            id: Math.random(),
            worker: selectedWorker,
            job: selectedJob,
            date: selectedDate,
            partOfDay: selectedPartOfDay,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Shift</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={employees.map(emp => `${emp.name} ${emp.surname}`)} // Get workers from context
                    renderInput={(params) => <TextField {...params} label="Worker" fullWidth margin="dense" />}
                    value={selectedWorker}
                    onChange={(event, newValue) => setSelectedWorker(newValue)}
                />
                <Autocomplete
                    options={roles} // Get job roles from context
                    renderInput={(params) => <TextField {...params} label="Job" fullWidth margin="dense" />}
                    value={selectedJob}
                    onChange={(event, newValue) => setSelectedJob(newValue)}
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
                    onChange={(e) => setSelectedPartOfDay(e.target.value)}
                >
                    {partsOfDay.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={!selectedWorker || !selectedJob || !selectedDate || !selectedPartOfDay}>
                    Add Shift
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddShiftModal;
