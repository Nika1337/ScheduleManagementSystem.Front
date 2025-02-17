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
        shiftColors: [
            "#404040", // Dark Gray (Neutral)
            "#A52A2A", // Brown (Earthy tone, related to primary)
            "#B22222", // Firebrick (Deep red, complements secondary)
            "#696969", // Dim Gray (A variation of dark gray)
            "#DC143C", // Crimson (Bright red, strong contrast)
            "#8B0000", // Dark Red (Similar to secondary, slightly muted)
            "#2F4F4F", // Dark Slate Gray (Subtle blue-gray contrast)
            "#CD5C5C", // Indian Red (Lighter, softer red)
            "#D2691E", // Chocolate (Warm brown, keeps variety)
            "#FF6347", // Tomato (Reddish-orange, to add pop)
        ],
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
