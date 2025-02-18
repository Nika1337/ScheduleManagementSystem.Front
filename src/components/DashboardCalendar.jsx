import { useState } from "react";
import { Box, Typography, Paper, Button, Grid, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ShiftDetailsModal from "./ShiftDetailsModal";
import { useAppContext } from "../context/AppContext";

const getShiftsForSlot = (shifts, date, partOfDay) => {
    return shifts.filter((shift) => shift.date === date && shift.partOfDay === partOfDay);
};

const DashboardCalendar = () => {
    const { shifts, setShifts, partsOfDay } = useAppContext();
    const theme = useTheme();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() - today.getDay());
        return today;
    });

    const [selectedShift, setSelectedShift] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const changeWeek = (offset) => {
        setStartDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + offset * 7);
            return newDate;
        });
    };

    const handleShiftClick = (shift) => {
        setSelectedShift(shift);
        setModalOpen(true);
    };

    const handleSaveShift = (updatedShift) => {
        setShifts((prevShifts) =>
            prevShifts.map((shift) =>
                shift.id === updatedShift.id ? updatedShift : shift
            )
        );
        setModalOpen(false);
    };
    const getShiftColor = (shiftId) => {
        const colors = theme.palette.shiftColors;
        return colors[shiftId % colors.length];
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 3, backgroundColor: theme.palette.background.default }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" gutterBottom align="left" color="text.primary">
                        Week of {startDate.toISOString().split("T")[0]}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => changeWeek(-1)}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                            «
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => changeWeek(1)}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                            »
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ overflowX: "auto", width: "100%" }}>
                    <Grid container sx={{ border: "2px solid #ddd", borderRadius: 2, minWidth: "900px", overflow: "hidden" }}>
                        <Grid container sx={{ backgroundColor: "#eeeeee", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>
                            <Grid item xs={2} sx={{ padding: 1, textAlign: "center", borderRight: "2px solid #ddd" }}>
                                Part of Day
                            </Grid>
                            {daysOfWeek.map((day, index) => {
                                const date = new Date(startDate);
                                date.setDate(startDate.getDate() + index);
                                return (
                                    <Grid item key={day} xs sx={{ padding: 1, textAlign: "center", borderRight: "2px solid #ddd", flexGrow: 1 }}>
                                        {day} <br /> {date.toISOString().split("T")[0]}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {partsOfDay.map((partOfDay) => (
                            <Grid container key={partOfDay} sx={{ borderBottom: "2px solid #ddd" }}>
                                <Grid item xs={2} sx={{ padding: 1, fontWeight: "bold", textAlign: "center", backgroundColor: "#f9f9f9", borderRight: "2px solid #ddd" }}>
                                    {partOfDay}
                                </Grid>

                                {daysOfWeek.map((_, index) => {
                                    const date = new Date(startDate);
                                    date.setDate(startDate.getDate() + index);
                                    const dateString = date.toISOString().split("T")[0];

                                    const dayShifts = getShiftsForSlot(shifts, dateString, partOfDay);

                                    return (
                                        <Grid item key={dateString + partOfDay} xs sx={{
                                            borderRight: "2px solid #ddd",
                                            padding: 1,
                                            minHeight: "80px",
                                            textAlign: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            flexGrow: 1
                                        }}>
                                            {dayShifts.length > 0
                                                ? dayShifts.map((shift) => (
                                                    <Paper
                                                        key={shift.id}
                                                        onClick={() => handleShiftClick(shift)}
                                                        sx={{
                                                            backgroundColor: getShiftColor(shift.id),
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
                                                        {shift.job} <br />
                                                        {shift.worker}
                                                    </Paper>
                                                ))
                                                : <Typography variant="body2" sx={{ color: "#aaa" }}> </Typography>}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <ShiftDetailsModal
                    shift={selectedShift}
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveShift}
                />
            </Box>
        </ThemeProvider>
    );
};

export default DashboardCalendar;
