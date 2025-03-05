import  { useContext, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SseContext } from '../context/SseContext.jsx';

function NotificationPopup() {
    const { addSubscriber } = useContext(SseContext);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const unsubscribe = addSubscriber((data) => {
            setMessage(data.message);
            setOpen(true);
        });

        return () => {
            unsubscribe();
        };
    }, [addSubscriber]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={() => setOpen(false)}
                severity="info"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default NotificationPopup;
