import { useState } from "react";
import { Box, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobsList from "../components/JobsList";
import AddJobModal from "../components/AddJobModal";


const Jobs = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [jobs, setJobs] = useState([
        { id: 1, name: "Software Engineer" },
        { id: 2, name: "Product Manager" },
        { id: 3, name: "UX Designer" },
    ]);

    const handleAddJob = (name) => {
        const newJob = { id: jobs.length + 1, name };
        setJobs([...jobs, newJob]);
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
