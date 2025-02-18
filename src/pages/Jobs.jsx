import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobsList from "../components/JobsList";
import AddJobModal from "../components/AddJobModal";
import { useAppContext } from "../context/AppContext"; // Import context

const Jobs = () => {
    const { jobs, setJobs } = useAppContext(); // Get jobs from context
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddJob = (name) => {
        setJobs((prevJobs) => [
            ...prevJobs,
            { id: prevJobs.length + 1, name }, // Assign a unique ID
        ]);
    };

    return (
        <Container disableGutters maxWidth="lg" sx={{ paddingBottom: "80px", position: "relative" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <JobsList jobs={jobs} />
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

            <AddJobModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddJob} />
        </Container>
    );
};

export default Jobs;
