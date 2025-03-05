import { useState, useEffect, useCallback } from "react";
import { Box, Fab, Container, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddWorkerModal from "../components/AddWorkerModal.jsx";
import WorkersList from "../components/WorkersList.jsx";
import { getWorkers } from "../services/workers";
import {getToken} from "../hooks/useAuth.js";

const Workers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchWorkers = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const workersData = await getWorkers(getToken());
            setWorkers(workersData);
        } catch (err) {
            console.error("Failed to fetch workers:", err);
            setError("Failed to load workers.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkers();
    }, [fetchWorkers]);

    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ padding: 3 }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <WorkersList workers={workers} />
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

            <AddWorkerModal open={isModalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchWorkers} />
        </Container>
    );
};

export default Workers;
