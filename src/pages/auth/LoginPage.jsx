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

import { useMediaQuery } from "@mui/material";

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
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  return (
    <>
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isSmallScreen ? "80%" : "30%",
            position: isSmallScreen ? "absolute" : "absolute",
            top: "40%",
            left: "50%",
            transform: isSmallScreen
              ? "translate(-50%, -10%)"
              : "translate(-50%, -50%)",
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/sticky-note.png"
              alt="Notes App Logo"
              style={{ width: 50, height: 50, marginRight: "10px" }}
            />
            <Typography variant="h5" sx={{}}>
              Notes
            </Typography>
            {/* Email field */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
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
                variant="outlined"
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
