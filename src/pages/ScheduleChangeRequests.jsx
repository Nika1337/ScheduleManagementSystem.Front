import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { CheckCircle, Cancel, Undo } from "@mui/icons-material";
import { useAppContext } from "../context/AppContext"; // Import context

const ScheduleChangeRequests = () => {
    const { scheduleRequests, setScheduleRequests, userRole } = useAppContext(); // Get requests & role from context

    const handleUpdate = (id, status) => {
        console.log(`Request ${id} was ${status}`);
        setScheduleRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
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
                        {scheduleRequests.length > 0 ? (
                            scheduleRequests.map((request) => (
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
                                        {userRole === "Admin" ? (
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
                                        ) : userRole === "Worker" ? (
                                            <IconButton
                                                color="default"
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
