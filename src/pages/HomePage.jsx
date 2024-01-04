import React, { useCallback } from "react";
import { FIREBASE_DB } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from ".././theme";
import Header from "../components/nav/Header";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Note from "../components/Note";
import TaggedNote from "../components/TaggedNote";
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
  const [tagNotes, setTagNotes] = useState([]);

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
              let authorNotes = noteData.filter((note) =>
                note.author.includes(user.email)
              );
              setNotes(authorNotes);
              let tagData = noteData.filter((note) =>
                note.tags.includes(user.email)
              );
              setTagNotes(tagData);
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
        sx={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Grid container spacing={3}>
          <Box sx={{ flexDirection: "column", padding: "50px" }}>
            <Typography variant="h6" sx={{ marginLeft: "25px" }}>
              My Notes
            </Typography>
            <Box sx={{ flexDirection: "column" }}>
              {notes.map((note) => (
                <Note
                  id={note.id}
                  title={note.title}
                  summarised={note.summarised}
                  author={note.author}
                  content={note.content}
                  createdDate={note.createdDate}
                  tags={note.tags}
                />
              ))}
            </Box>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/addNote")}
              sx={{
                borderRadius: "30px",
              }}
              fullWidth="true"
            >
              + Add Note
            </Button>
          </Box>

          <Box sx={{ flexDirection: "column", padding: "50px" }}>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              Tagged Notes
            </Typography>
            <Box sx={{ flexDirection: "column" }}>
              {tagNotes.map((note) => (
                <TaggedNote
                  id={note.id}
                  title={note.title}
                  summarised={note.summarised}
                  author={note.author}
                  content={note.content}
                  createdDate={note.createdDate}
                  tags={note.tags}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
