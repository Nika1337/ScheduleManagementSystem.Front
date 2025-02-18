import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const ShiftDetailsModal = ({ shift, open, onClose, onSave }) => {
    const { partsOfDay } = useAppContext();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPartOfDay, setSelectedPartOfDay] = useState("");

    useEffect(() => {
        if (shift) {
            setSelectedDate(shift.date || "");
            setSelectedPartOfDay(shift.partOfDay || "");
        }
    }, [shift]);

    const handleSave = () => {
        onSave({ ...shift, date: selectedDate, partOfDay: selectedPartOfDay });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Shift Details</DialogTitle>
            <DialogContent>
                <TextField
                    label="Job"
                    value={shift?.job || ""}
                    fullWidth
                    margin="dense"
                    disabled
                />
                <TextField
                    label="Worker"
                    value={shift?.worker || ""}
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
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShiftDetailsModal;
