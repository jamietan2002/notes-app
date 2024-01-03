import React, { useCallback } from "react";
import { FIREBASE_DB } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from ".././theme";
import Header from "../components/nav/Header";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Note from "../components/Note";
import createNote from "../functions/createNote";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const collectionRef = collection(FIREBASE_DB, "notes");
  const [notes, setNotes] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence).then(() => {
      const user = auth.currentUser;
      if (user) {
        console.log(user.email);
        const getNotes = async () => {
          const q = query(collectionRef);
          await getDocs(q)
            .then((note) => {
              let noteData = note.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              //user.email
              noteData = noteData.filter(
                (note) =>
                  note.tags.includes(user.email) ||
                  note.author.includes(user.email)
              );
              setNotes(noteData);
              console.log(noteData);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getNotes();
      } else {
        console.log("user not signed in");
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: "primary", color: "black", padding: "20px" }}>
          <Typography variant="h4">My Notes</Typography>
        </Box>

        <Box sx={{ bgcolor: "primary", color: "black", padding: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/addNote")}
          >
            Add Note
          </Button>
        </Box>
        <Container maxWidth="lg" sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            {/* Notes list */}
            {notes.map((note) => (
              <Grid item xs={12} md={6} key={note.id}>
                <Note
                  id={note.id}
                  title={note.title}
                  summarised={note.summarised}
                  author={note.author}
                  content={note.content}
                  createdDate={note.createdDate}
                  tags={note.tags}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
