import React from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { Box, Container, Typography, Grid, Button, TextField } from "@mui/material";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";



const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const isValidEmail = (email) => {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const handleSignUp = async (email, password, username) => {
        console.log(email)
        if (!isValidEmail(email) || !isValidPassword(password) || !username) {
            console.log("invalid email/ password/ username")
            alert("invalid credentials")
            return;
          }
        //firebase auth
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password, username)
            .then(async (userCredential) => {
                //create user in firebase
                await setDoc(doc(FIREBASE_DB, "users", email), {
            email: email,
            username: username,
          });
                navigate("/home")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                alert(error)
            });
        
        
    }

    return (
        <>
          <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
            {/* Header */}
            <Box sx={{ bgcolor: "primary", color: "black", padding: "20px" }}>
              <Typography variant="h4">Sign Up</Typography>
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
    
                {/* Username field */}
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="filled"
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
                    onClick={()=>handleSignUp(email, password, username)}
                  >
                    CREATE ACCOUNT
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    };

export default Register