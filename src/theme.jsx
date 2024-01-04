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
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
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
