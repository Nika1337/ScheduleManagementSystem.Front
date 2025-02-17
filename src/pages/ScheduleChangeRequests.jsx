import { useState } from "react";
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from "@mui/material";
import { CheckCircle, Cancel, Undo } from "@mui/icons-material"; // Added Undo for Withdraw

// Mock Data
const mockRequests = [
    {
        id: "1",
        workerName: "John Doe",
        jobType: "Electrician",
        previousDate: "2025-02-15",
        previousPartOfDay: "Morning",
        newDate: "2025-02-16",
        newPartOfDay: "Evening",
        requestDate: "2025-02-10",
    },
    {
        id: "2",
        workerName: "Jane Smith",
        jobType: "Plumber",
        previousDate: "2025-02-17",
        previousPartOfDay: "Afternoon",
        newDate: "2025-02-18",
        newPartOfDay: "Morning",
        requestDate: "2025-02-11",
    },
];

// Change role to "admin" or "worker" to test different views
const userRole = "worker"; // or "worker"

const ScheduleChangeRequests = () => {
    const [requests, setRequests] = useState(mockRequests);

    const handleUpdate = (id, status) => {
        console.log(`Request ${id} was ${status}`);
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    };

    return (
        <Box sx={{ padding: 3 }}>
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
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.workerName}</TableCell>
                                    <TableCell>{request.jobType}</TableCell>
                                    <TableCell>
                                        {request.previousDate} - {request.previousPartOfDay}
                                    </TableCell>
                                    <TableCell>
                                        {request.newDate} - {request.newPartOfDay}
                                    </TableCell>
                                    <TableCell>{request.requestDate}</TableCell>
                                    <TableCell>
                                        {userRole === "admin" ? (
                                            <>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleUpdate(request.id, "accepted")}
                                                >
                                                    <CheckCircle />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleUpdate(request.id, "rejected")}
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </>
                                        ) : userRole === "worker" ? (
                                            <IconButton
                                                color="gray"
                                                onClick={() => handleUpdate(request.id, "withdrawn")}
                                            >
                                                <Undo />
                                            </IconButton>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No schedule change requests available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ScheduleChangeRequests;
