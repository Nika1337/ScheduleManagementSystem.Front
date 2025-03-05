import {useState, useEffect, useCallback, useContext} from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Alert } from "@mui/material";
import { CheckCircle, Cancel, Undo } from "@mui/icons-material";
import {
    getPendingScheduleChanges,
    acceptPendingScheduleChange,
    rejectPendingScheduleChange,
    withdrawPendingScheduleChange
} from "../services/pending";
import { getUserRole, getToken } from "../hooks/useAuth";
import {SseContext} from "../context/SseContext.jsx";

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toTimeString().slice(0, 5);
    return `${formattedDate} ${formattedTime}`;
};

const PendingScheduleChanges = () => {
    const [scheduleRequests, setScheduleRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userRole = getUserRole();

    const { addSubscriber } = useContext(SseContext);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const requests = await getPendingScheduleChanges(getToken());
            setScheduleRequests(requests);
        } catch (err) {
            console.error("Failed to fetch schedule requests:", err);
            setError("Failed to load schedule change requests.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    useEffect(() => {
        const unsubscribe = addSubscriber((data) => {
            console.log("SSE event in Dashboard:", data);


            fetchRequests();
        });

        return () => {
            unsubscribe();
        };
    }, [userRole, addSubscriber, fetchRequests]);

    const handleUpdate = async (id, action) => {
        try {
            if (action === "accepted") await acceptPendingScheduleChange(id, getToken());
            if (action === "rejected") await rejectPendingScheduleChange(id, getToken());
            if (action === "withdrawn") await withdrawPendingScheduleChange(id, getToken());
            await fetchRequests();
        } catch (err) {
            console.error(`Failed to ${action} request:`, err);
            setError(`Failed to ${action} request.`);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Worker</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Job Type</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Previous Schedule</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>New Schedule</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Request Date</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduleRequests.length > 0 ? (
                                scheduleRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.workerFirstName} {request.workerLastName}</TableCell>
                                        <TableCell>{request.jobName}</TableCell>
                                        <TableCell>{request.previousDate} - {request.previousPartOfDay}</TableCell>
                                        <TableCell>{request.newDate} - {request.newPartOfDay}</TableCell>
                                        <TableCell>{formatDateTime(request.requestDateTime)}</TableCell>
                                        <TableCell>
                                            {userRole === "Admin" ? (
                                                <>
                                                    <IconButton color="success" onClick={() => handleUpdate(request.id, "accepted")}>
                                                        <CheckCircle />
                                                    </IconButton>
                                                    <IconButton color="error" onClick={() => handleUpdate(request.id, "rejected")}>
                                                        <Cancel />
                                                    </IconButton>
                                                </>
                                            ) : userRole === "Worker" ? (
                                                <IconButton color="default" onClick={() => handleUpdate(request.id, "withdrawn")}>
                                                    <Undo />
                                                </IconButton>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No pending schedule changes available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default PendingScheduleChanges;
