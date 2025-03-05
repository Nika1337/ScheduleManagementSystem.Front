import { useState, useEffect, useCallback } from "react";
import { Box, Fab, Container, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardCalendar from "../components/DashboardCalendar.jsx";
import AddScheduleModal from "../components/AddScheduleModal.jsx";
import { changeSchedule, getSchedules } from "../services/schedules";
import { getUserRole, getToken } from "../hooks/useAuth";
import { PART_OF_DAY_OPTIONS } from "../constants/partOfDay";

// Helper to get Monday for a given date
const getMondayOfWeek = (date) => {
    const monday = new Date(date);
    monday.setDate(date.getDate() - date.getDay() + 1);
    return monday;
};

const Dashboard = () => {
    const [weekStartDate, setWeekStartDate] = useState(getMondayOfWeek(new Date()));
    const [schedules, setSchedules] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userRole = getUserRole();

    const getStartAndEndDate = (mondayDate) => {
        const mondayThisWeek = new Date(mondayDate);
        const mondayNextWeek = new Date(mondayThisWeek);
        mondayNextWeek.setDate(mondayThisWeek.getDate() + 7);
        const formatDate = (date) => date.toISOString().split("T")[0];
        return {
            startDate: formatDate(mondayThisWeek),
            endDate: formatDate(mondayNextWeek),
        };
    };

    const fetchSchedules = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const { startDate, endDate } = getStartAndEndDate(weekStartDate);
            console.log(`Fetching schedules from ${startDate} to ${endDate}`);
            const data = await getSchedules(startDate, endDate, getToken());
            setSchedules(data);
        } catch (err) {
            console.error("Failed to fetch schedules:", err);
            setError("Failed to load schedules.");
        } finally {
            setLoading(false);
        }
    }, [weekStartDate]);

    // Fetch schedules whenever weekStartDate changes.
    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);


    // Handler for changing the week; offset is in weeks (e.g., -1 for previous, 1 for next)
    const changeWeek = (offset) => {
        setWeekStartDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + offset * 7);
            return newDate;
        });
    };

    return (
        <Container
            disableGutters
            maxWidth="lg"
            sx={{ paddingBottom: "80px", position: "relative" }}
        >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <CircularProgress sx={{ alignSelf: "center", marginTop: 5 }} />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <DashboardCalendar
                        schedules={schedules}
                        weekStartDate={weekStartDate}
                        changeWeek={changeWeek}
                        partsOfDay={PART_OF_DAY_OPTIONS}
                        fetchSchedules={fetchSchedules}
                    />
                )}
            </Box>

            {userRole === "Admin" && (
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
            )}

            <AddScheduleModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchSchedules}
            />
        </Container>
    );
};

export default Dashboard;
