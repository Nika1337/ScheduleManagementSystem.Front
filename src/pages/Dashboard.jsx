import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardCalendar from "../components/DashboardCalendar.jsx";
import AddShiftModal from "../components/AddShiftModal.jsx";

const userRole = "admin";

const Dashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [shifts, setShifts] = useState([
        { id: 1, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Evening" },
        { id: 2, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-22", partOfDay: "Afternoon" },
        { id: 3, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Morning" },
        { id: 4, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-21", partOfDay: "Evening" },
        { id: 5, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Afternoon" },
        { id: 6, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-20", partOfDay: "Evening" },
    ]);

    const handleAddShift = (newShift) => {
        setShifts([...shifts, newShift]);
    };

    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <DashboardCalendar shifts={shifts} />
            </Box>

            {/* Floating FAB - Fixed Position, Aligns with Container */}
            {userRole === "admin" && (
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
