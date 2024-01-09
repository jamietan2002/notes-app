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
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useMediaQuery } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleSignUp = async (email, password, username) => {
    console.log(email);
    if (!isValidEmail(email) || !isValidPassword(password) || !username) {
      console.log("invalid email/ password/ username");
      alert("invalid credentials");
      return;
    }
    //firebase auth
    setPersistence(FIREBASE_AUTH, browserSessionPersistence).then(() =>
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password, username)
        .then(async (userCredential) => {
          //create user in firebase
          await setDoc(doc(FIREBASE_DB, "users", email), {
            email: email,
            username: username,
          });
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(error);
        })
    );
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

            {/* Username field */}
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                color="info"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            {/* Sign Up Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSignUp(email, password, username)}
              >
                SIGN UP
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" align="center">
                Already have an account?{" "}
                <Button
                  component={Link}
                  variant="ouitline"
                  color="primary"
                  to="/login"
                >
                  Login here
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Register;
