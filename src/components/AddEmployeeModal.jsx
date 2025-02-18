import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select } from "@mui/material";

const AddEmployeeModal = ({ open, onClose, onSave, roles }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (open) {
            setName("");
            setSurname("");
            setEmail("");
            setRole(""); // Reset role selection
        }
    }, [open]);

    const handleSave = () => {
        if (!name.trim() || !surname.trim() || !email.trim() || !role) return;

        const newEmployee = { name: name.trim(), surname: surname.trim(), email: email.trim(), role };
        onSave(newEmployee);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Surname"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
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
                <Select
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem value="" disabled>Select Role</MenuItem>
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={!name.trim() || !surname.trim() || !email.trim() || !role}>
                    Add Employee
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEmployeeModal;
