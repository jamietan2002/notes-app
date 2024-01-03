import { Box, Container, Grid, Button, Typography } from "@mui/material";
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
  // const { state } = useLocation();
  const state = {
    title: "hi",
    content: "jamie",
    tags: ["n"],
    author: "jamie",
    summary:
      "I need to complete the code for hybrid search. En ting needs to help me review the code.",
  };
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const userRef = collection(FIREBASE_DB, "users");
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
      summarised: state.summary,
      ...(state.id && { id: state.id }),
    };
    console.log(newNote);
    await storeNote(newNote).then(() => {
      console.log("storing note");
      navigate("/");
    });
  };
  const onCancel = async () => {
    console.log("cancelling");
    navigate("/AddNote");
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Optional for vertical centering
          padding: 3,
          backgroundColor: "#F5F5F5", // Light gray background
          padding: "32px",
          fontFamily: "Roboto, sans-serif", // Readable font family
        }}
      >
        <Container maxWidth="xs" sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <Typography variant="h4" sx={{ lineHeight: 1.5, mt: 2 }}>
                Summary
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {state.summary}
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SubmitNote;
