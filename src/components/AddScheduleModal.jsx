import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Autocomplete, CircularProgress } from "@mui/material";
import { getWorkers } from "../services/workers";
import { getJobs } from "../services/jobs";
import { addSchedule } from "../services/schedules";
import { getToken } from "../hooks/useAuth";
import { PART_OF_DAY_OPTIONS } from "../constants/partOfDay";

const AddScheduleModal = ({ open, onClose, onSuccess }) => {
    const [workers, setWorkers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPartOfDay, setSelectedPartOfDay] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setSelectedWorker(null);
            setSelectedJob(null);
            setSelectedDate("");
            setSelectedPartOfDay("");
            setError("");

            const fetchData = async () => {
                try {
                    setLoading(true);
                    const [workersData, jobsData] = await Promise.all([
                        getWorkers(getToken()),
                        getJobs(getToken()),
                    ]);
                    setWorkers(workersData);
                    setJobs(jobsData);
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setError("Failed to load workers or jobs.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [open]);

    const handleSave = async () => {
        if (!selectedWorker || !selectedJob || !selectedDate || selectedPartOfDay === "") return;

        const newSchedule = {
            workerId: selectedWorker.id,
            jobId: selectedJob.id,
            date: selectedDate,
            partOfDay: selectedPartOfDay,
        };

        try {
            await addSchedule(newSchedule, getToken());
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to add schedule:", err);
            setError("Failed to add schedule. Please try again.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
                ) : error ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                ) : (
                    <>
                        <Autocomplete
                            options={workers}
                            getOptionLabel={(worker) => `${worker.firstName} ${worker.lastName}`}
                            renderInput={(params) => <TextField {...params} label="Worker" fullWidth margin="dense" />}
                            value={selectedWorker}
                            onChange={(event, newValue) => setSelectedWorker(newValue)}
                        />
                        <Autocomplete
                            options={jobs}
                            getOptionLabel={(job) => job.name}
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
                            onChange={(e) => setSelectedPartOfDay(Number(e.target.value))}
                        >
                            {PART_OF_DAY_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={!selectedWorker || !selectedJob || !selectedDate || selectedPartOfDay === "" || loading}
                >
                    Add Schedule
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddScheduleModal;
