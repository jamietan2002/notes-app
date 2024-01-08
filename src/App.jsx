import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/HomePage";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import AddNote from "./pages/AddNotePage";
import SubmitNote from "./pages/SubmitNotePage";
import EditNote from "./pages/EditNotePage";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="home" element={<Home />} errorElement={<ErrorPage />} />
      <Route path="login" element={<Login />} errorElement={<ErrorPage />} />
      <Route
        path="register"
        element={<Register />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="addNote"
        element={<AddNote />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="editNote"
        element={<EditNote />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="submitNote"
        element={<SubmitNote />}
        errorElement={<ErrorPage />}
      />
      <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
