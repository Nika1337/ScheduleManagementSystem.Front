import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from "@mui/material";

const EmployeesList = ({ employees, onRoleChange }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Surname</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.surname}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.startDate}</TableCell>
                                <TableCell>
                                    <Select
                                        value={employee.role}
                                        onChange={(e) => onRoleChange(employee.id, e.target.value)}
                                        variant="standard"
                                    >
                                        {["Worker", "Manager", "Admin"].map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No employees found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeesList;
