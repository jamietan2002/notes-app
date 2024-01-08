import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import React from "react";
import { FIREBASE_DB, app } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Header from "../components/nav/Header";
import storeNote from "../functions/storeNote";
import { useNavigate, useLocation } from "react-router-dom";

const SubmitNote = () => {
  const { state } = useLocation();
  // const state = {
  //   title: "hi",
  //   content: "jamie",
  //   tags: ["n"],
  //   author: "jamie",
  //   summary:
  //     "I need to complete the code for hybrid search. En ting needs to help me review the code.",
  // };

  const [summary, setSummary] = useState(state.summary);

  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from users collection and store in state
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence).then(() => {
      const user = auth.currentUser;
      if (user) {
        console.log(user.email);
        setCurrentUser(user.email);
        console.log(state);
      } else {
        console.log("user not signed in");
      }
    });
  }, []);

  const onSubmit = async () => {
    const newNote = {
      title: state.title,
      content: state.content,
      tags: state.tags,
      author: state.author,
      summarised: summary,
      ...(state.id && { id: state.id }),
    };
    console.log(newNote);
    await storeNote(newNote).then(() => {
      navigate("/home");
    });
  };
  const onCancel = async () => {
    console.log("cancelling");
    const note = {
      title: state.title,
      content: state.content,
      tags: state.tags,
    };
    navigate("/EditNote", { state: note });
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          width: "100vw",
          marginTop: "80px",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" margin={1}>
            SUMMARY
          </Typography>
          <Box sx={{ marginBottom: 2, width: "90%" }}>
            <TextField
              label="Edit Summary..."
              variant="outlined"
              color="info"
              required
              multiline
              rows={4}
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
              fullWidth={true}
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-evenly">
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SubmitNote;
