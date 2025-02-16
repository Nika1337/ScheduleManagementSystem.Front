import { useState } from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardCalendar from "../components/DashboardCalendar.jsx";
import AddShiftModal from "../components/AddShiftModal.jsx";

const userRole = "admin";

const Dashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [shifts, setShifts] = useState([
        { id: 1, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Morning" },
        { id: 2, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-22", partOfDay: "Evening" },
    ]);

    const handleAddShift = (newShift) => {
        setShifts([...shifts, newShift]);
    };

    return (
        <Box sx={{ position: "relative"}}>
            <DashboardCalendar shifts={shifts} />

            {userRole === "admin" && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                    }}
                    onClick={() => setModalOpen(true)}
                >
                    <AddIcon />
                </Fab>
            )}

            <AddShiftModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddShift} />
        </Box>
    );
};

export default Dashboard;
