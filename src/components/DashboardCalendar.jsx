import { Box, Typography, Paper, Button, Grid, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ScheduleDetailsModal from "./ScheduleDetailsModal.jsx";
import { useState } from "react";

// Helper to filter schedules by date and part of the day
const getSchedulesForSlot = (schedules, date, partOfDay) => {
    return schedules.filter(
        (schedule) => schedule.date === date && schedule.partOfDay === partOfDay
    );
};

const DashboardCalendar = ({ schedules, weekStartDate, changeWeek, partsOfDay, fetchSchedules }) => {
    const theme = useTheme();
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
        setModalOpen(true);
    };

    // Dynamically number schedules shown on the page
    const scheduleMap = new Map();
    let scheduleIndex = 0;
    const getScheduleColor = (scheduleId) => {
        if (!scheduleMap.has(scheduleId)) {
            scheduleMap.set(scheduleId, scheduleIndex++);
        }
        const colors =
            theme.palette.shiftColors ||
            ["#1976D2", "#388E3C", "#D32F2F", "#FFA000"];
        return colors[scheduleMap.get(scheduleId) % colors.length];
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" gutterBottom align="left" color="text.primary">
                        Week of {weekStartDate.toISOString().split("T")[0]}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
                        <Button variant="contained" color="primary" onClick={() => changeWeek(-1)}>
                            «
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => changeWeek(1)}>
                            »
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        overflowX: "auto",
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: 2,
                    }}
                >
                    <Grid
                        container
                        sx={{
                            border: "2px solid #ddd",
                            borderRadius: 2,
                            minWidth: "900px",
                            overflow: "hidden",
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                backgroundColor: "#eeeeee",
                                fontWeight: "bold",
                                borderBottom: "2px solid #ddd",
                            }}
                        >
                            <Grid
                                item
                                xs={2}
                                sx={{
                                    padding: 1,
                                    textAlign: "center",
                                    borderRight: "2px solid #ddd",
                                }}
                            >
                                Part of Day
                            </Grid>
                            {daysOfWeek.map((day, index) => {
                                const date = new Date(weekStartDate);
                                date.setDate(weekStartDate.getDate() + index);
                                return (
                                    <Grid
                                        item
                                        key={day}
                                        xs
                                        sx={{
                                            padding: 1,
                                            textAlign: "center",
                                            borderRight: "2px solid #ddd",
                                        }}
                                    >
                                        {day} <br /> {date.toISOString().split("T")[0]}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {partsOfDay.map(({ value, label }) => (
                            <Grid container key={value} sx={{ borderBottom: "2px solid #ddd" }}>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        padding: 1,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        backgroundColor: "#eeeeee",
                                        borderRight: "2px solid #ddd",
                                    }}
                                >
                                    {label}
                                </Grid>

                                {daysOfWeek.map((_, index) => {
                                    const date = new Date(weekStartDate);
                                    date.setDate(weekStartDate.getDate() + index);
                                    const dateString = date.toISOString().split("T")[0];
                                    const daySchedules = getSchedulesForSlot(schedules, dateString, value);
                                    return (
                                        <Grid
                                            item
                                            key={dateString + value}
                                            xs
                                            sx={{
                                                borderRight: "2px solid #ddd",
                                                padding: 1,
                                                minHeight: "80px",
                                                textAlign: "center",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            {daySchedules.length > 0 ? (
                                                daySchedules.map((schedule) => (
                                                    <Paper
                                                        key={schedule.id}
                                                        onClick={() => handleScheduleClick(schedule)}
                                                        sx={{
                                                            backgroundColor: getScheduleColor(schedule.id),
                                                            color: "white",
                                                            padding: "8px 12px",
                                                            borderRadius: "6px",
                                                            textAlign: "center",
                                                            fontSize: "0.875rem",
                                                            fontWeight: "bold",
                                                            width: "90%",
                                                            marginBottom: "4px",
                                                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {schedule.jobName || "No Job"} <br />
                                                        {schedule.workerFirstName} {schedule.workerLastName}
                                                    </Paper>
                                                ))
                                            ) : (
                                                <Typography variant="body2" sx={{ color: "#aaa" }}>
                                                    {/* Empty slot */}
                                                </Typography>
                                            )}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Updated ShiftDetailsModal with onSave */}
                <ScheduleDetailsModal
                    schedule={selectedSchedule}
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={fetchSchedules} // ✅ Update parent schedules when a shift is saved
                />
            </Box>
        </ThemeProvider>
    );
};

export default DashboardCalendar;
