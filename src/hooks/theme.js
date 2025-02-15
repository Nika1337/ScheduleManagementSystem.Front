import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light", // Can be switched to "dark"
        primary: {
            main: "#282828", // Change to any primary color
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#cf2e2e", // Secondary color (e.g., red)
        },
        background: {
            default: "#F5F5F5",
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    padding: "8px 16px",
                },
            },
        },
    },
});

export default theme;
