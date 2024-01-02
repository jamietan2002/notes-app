import { Box, Container, Grid, Button } from "@mui/material";
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
import { Typography } from "antd";
import storeNote from "../functions/storeNote";
import { useNavigate, useLocation } from "react-router-dom";

const SubmitNote = () => {
  const { state } = useLocation();
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
      <Box sx={{ padding: 3, display: "flex", flexDirection: "column" }}>
        {/* <Box>{state.summary}</Box> */}
        <Container maxWidth="lg" sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {state.summary}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SubmitNote;
