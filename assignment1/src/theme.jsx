import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1e1e1e" },
    secondary: { main: "#b34100" },
    background: {
      default: "#D3D3D3",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontSize: "2.8rem", fontWeight: 700, color: "#1e1e1e" },
    h2: { fontSize: "2.2rem", fontWeight: 600, letterSpacing: "0.5px", color: "#1e1e1e" },
    h3: { fontSize: "1.8rem", fontWeight: 500, color: "#b34100" }, 
    body1: { fontSize: "1rem", lineHeight: 1.6, color: "#333333" },
    body2: { fontSize: "0.9rem", color: "#555555" },
    button: { textTransform: "none", fontWeight: 600, color: "#ffffff" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { 
          backgroundColor: "#d7d7d7",
          color: "#333333",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: "#b34100", color: "#ffffff" } },
    },
    MuiDrawer: {
      styleOverrides: { paper: { backgroundColor: "#1e1e1e", color: "#ffffff" } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: 600,
          "&:hover": { backgroundColor: "#8a2f00" },
        },
      },
    },
  },
});

export default theme;
