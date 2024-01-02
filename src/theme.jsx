import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },

    secondary: {
      main: "#000000",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>

      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
    </ThemeProvider>
  );
};

export { theme };
