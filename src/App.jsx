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
import StoreNote from "./pages/StoreNotePage";
import Header from "./components/nav/Header";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route index element={<Header />} /> */}
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="addNote" element={<AddNote />} />
      <Route path="storeNote" element={<StoreNote />} />
      <Route path="/" element={<Home />} />
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
