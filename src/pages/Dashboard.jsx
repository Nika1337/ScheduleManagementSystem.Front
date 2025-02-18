import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardCalendar from "../components/DashboardCalendar.jsx";
import AddShiftModal from "../components/AddShiftModal.jsx";
import { useAppContext } from "../context/AppContext"; // Import context

const Dashboard = () => {
    const { shifts, setShifts, userRole } = useAppContext(); // Get userRole from context
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddShift = (newShift) => {
        setShifts((prevShifts) => [
            ...prevShifts,
            { ...newShift, id: prevShifts.length + 1 }
        ]);
    };


    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <DashboardCalendar shifts={shifts} />
            </Box>

            {/* Floating FAB - Fixed Position, Aligns with Container */}
            {userRole === "Admin" && ( // Now using userRole from context
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setModalOpen(true)}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: { xs: 24, lg: "calc(50% - 600px + 24px)" }, // Keeps it inside the container
                        zIndex: 1000,
                    }}
                >
                    <AddIcon />
                </Fab>
            )}

            <AddShiftModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddShift} />
        </Container>
    );
};

export default Dashboard;
