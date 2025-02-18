import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeesList from "../components/EmployeesList";
import { useAppContext } from "../context/AppContext"; // Import context

const Employees = () => {
    const { employees, setEmployees, roles } = useAppContext(); // Get employees & roles from context
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddEmployee = (newEmployee) => {
        setEmployees((prevEmployees) => [
            ...prevEmployees,
            { ...newEmployee, id: prevEmployees.length + 1, startDate: new Date().toISOString().split("T")[0] }, // Assign mock ID & start date
        ]);
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
            <AddEmployeeModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddEmployee} roles={roles} />
        </Container>
    );
};

export default Employees;
