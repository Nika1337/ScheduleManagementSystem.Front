import { useState, useEffect, useCallback } from "react";
import { Box, Fab, Container, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobsList from "../components/JobsList";
import AddJobModal from "../components/AddJobModal";
import { getJobs } from "../services/jobs";
import { getToken } from "../hooks/useAuth.js";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const jobsData = await getJobs(getToken());
            setJobs(jobsData);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setError("Failed to load jobs.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <JobsList jobs={jobs} />
                )}
            </Box>

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

            <AddJobModal open={isModalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchJobs} />
        </Container>
    );
};

export default Jobs;
