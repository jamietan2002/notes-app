import React from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Successfully logged in");
      console.log(user);
      navigate("/home");
    } catch (error) {
      alert("Wrong email/password! Please retry.");
      console.log("Error logging in:", error);
      return false;
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: "primary", color: "black", padding: "20px" }}>
          <Typography variant="h4">Login</Typography>
        </Box>

        {/* Main content */}
        <Container maxWidth="lg" sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            {/* Email field */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                value={email}
                color="info"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            {/* Password field */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                fullWidth
                type="password"
                value={password}
                color="info"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            {/* Sign Up Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin(email, password)}
              >
                LOG IN
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" align="center">
                Don't have an account?{" "}
                <Button
                  component={Link}
                  variant="ouitline"
                  color="primary"
                  to="/register"
                >
                  Sign up here
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Login;
