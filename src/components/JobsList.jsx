import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const JobsList = ({ jobs }) => {
    return (
        <Paper sx={{ padding: "16px" }}>
            {jobs.length > 0 ? (
                <List>
                    {jobs.map((job) => (
                        <ListItem key={job.id} divider>
                            <ListItemText primary={job.name} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography align="center" sx={{ padding: 2, color: "gray" }}>
                    No jobs found.
                </Typography>
            )}
        </Paper>
    );
};

export default JobsList;
