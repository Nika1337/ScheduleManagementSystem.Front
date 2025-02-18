import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeesList from "../components/EmployeesList";

// Mock roles (these would be fetched from the server)
const mockRoles = ["Worker", "Manager", "Admin"];

// Mock Employees Data
const mockEmployees = [
    { id: 1, name: "John", surname: "Doe", email: "john.doe@example.com", startDate: "2025-02-15", role: "Worker" },
    { id: 2, name: "Jane", surname: "Smith", email: "jane.smith@example.com", startDate: "2025-02-20", role: "Manager" },
];

const Employees = () => {
    const [employees, setEmployees] = useState(mockEmployees);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]); // Mock ID
    };

    const handleRoleChange = (id, newRole) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.id === id ? { ...emp, role: newRole } : emp))
        );
    };

    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ padding: 3 }}>
                {/* Employees List Component */}
                <EmployeesList employees={employees} onRoleChange={handleRoleChange} />
            </Box>

            {/* Floating FAB for Adding Employee */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setModalOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: { xs: 24, lg: "calc(50% - 600px + 24px)" },
                    zIndex: 1000,
                }}
            >
                <AddIcon />
            </Fab>

            {/* Add Employee Modal */}
            <AddEmployeeModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddEmployee} roles={mockRoles} />
        </Container>
    );
};

export default Employees;
