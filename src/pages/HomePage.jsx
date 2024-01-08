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
  const [currentUser, setCurrentUser] = useState("");

  const emptyNote = {
    title: "",
    content: "",
    tags: [],
  };

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

              noteData = noteData.sort((a, b) => b.createdDate - a.createdDate);

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

        //get username
        const getUser = async () => {
          const q = query(collection(FIREBASE_DB, "users"));
          await getDocs(q)
            .then((userDoc) => {
              let userData = userDoc.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              let curr = userData.filter((subUser) =>
                subUser.email.includes(user.email)
              );
              console.log(curr);
              setCurrentUser(curr[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
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
          // flex: 1,
          padding: "20px",
          backgroundColor: "#F5F5F5",
          marginTop: "60px",
        }}
      >
        <Grid container spacing={3}>
          <Box sx={{ flexDirection: "column", padding: "50px" }}>
            <Typography variant="h6" sx={{ marginLeft: "25px" }}>
              My Notes
            </Typography>
            <Box sx={{ flexDirection: "column" }}>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <Note
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    summarised={note.summarised}
                    author={note.author}
                    content={note.content}
                    createdDate={note.createdDate}
                    tags={note.tags}
                  />
                ))
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", margin: "30px" }}
                >
                  You don't have any notes yet. Create your first note to get
                  started!
                </Typography>
              )}
            </Box>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/addNote", { state: emptyNote })}
              sx={{
                borderRadius: "30px",
              }}
              fullWidth
            >
              + Add Note
            </Button>
          </Box>

          <Box sx={{ flexDirection: "column", padding: "50px" }}>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              Tagged Notes
            </Typography>
            <Box sx={{ flexDirection: "column" }}>
              {tagNotes.length > 0 ? (
                tagNotes.map((note) => (
                  <TaggedNote
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    summarised={note.summarised}
                    author={note.author}
                    content={note.content}
                    createdDate={note.createdDate}
                    tags={note.tags}
                    currentUser={currentUser}
                  />
                ))
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", margin: "30px" }}
                >
                  You haven't been tagged in any notes yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
