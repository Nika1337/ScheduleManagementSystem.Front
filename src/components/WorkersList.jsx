import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toISOString().split("T")[0];
};

const WorkersList = ({ workers }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workers.length > 0 ? (
                        workers.map((worker) => (
                            <TableRow key={worker.id}>
                                <TableCell>{worker.firstName}</TableCell>
                                <TableCell>{worker.lastName}</TableCell>
                                <TableCell>{worker.email}</TableCell>
                                <TableCell>{formatDate(worker.startDate)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No workers found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WorkersList;
