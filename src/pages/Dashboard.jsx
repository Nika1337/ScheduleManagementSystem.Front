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
        <Container
            disableGutters
            maxWidth={false}
            sx={{ position: "relative", paddingBottom: "24px" }}
        >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <DashboardCalendar shifts={shifts} />

                {userRole === "admin" && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => setModalOpen(true)}
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                )}
            </Box>

            <AddShiftModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddShift} />
        </Container>
    );
};

export default Dashboard;
