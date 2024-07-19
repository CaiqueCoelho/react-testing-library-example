import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
