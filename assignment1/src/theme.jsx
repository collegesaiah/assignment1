import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#000000" }, 
    secondary: { main: "#ff6700" },
    background: {
      default: "#ff9248",
      paper: "#ff9248",
    },
    text: {
      primary: "#000000",
      secondary: "#b0b0b0",
    },
  },
});

export default theme;