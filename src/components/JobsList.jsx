import "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";

const JobsList = ({ jobs }) => {
    return (
        <Paper sx={{ padding: "16px" }}>
            <List>
                {jobs.map((job) => (
                    <ListItem key={job.id} divider>
                        <ListItemText primary={job.name} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default JobsList;
