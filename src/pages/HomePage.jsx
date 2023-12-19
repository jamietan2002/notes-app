import React from 'react'
import { FIREBASE_DB } from '../firebaseConfig'
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '.././theme'
import Header from '../components/nav/Header'
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Note from "../components/Note";
import createNote from '../functions/createNote';
import { getAuth } from "firebase/auth";


const Home = () => {
    const collectionRef = collection(FIREBASE_DB, 'notes')
    const [notes, setNotes] = useState([]);
    const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //     console.log(user.email)
    // } else {
    //     console.log("user not signed in")
    // }


    useEffect(() => {
        const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log(user.email)
    } else {
        console.log("user not signed in")
    }
        const getNotes = async () => {
            const q = query(collectionRef)
            await getDocs(q).then((note) => {
                let noteData = note.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                noteData = noteData.filter((note) => note.tag.includes(user.email));
                setNotes(noteData)
                console.log(noteData)

            }).catch((err) => {
                console.log(err);
            })
        }
        getNotes()
    }, [])

    // const addNote = async (note) => {
    //     const createdNote = createNote(note)
    //     setNotes([...notes, createdNote]);
    //     console.log(createdNote)
    // }

    return (
        <>
            <Header />
            <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{ bgcolor: "primary", color: "black", padding: "20px" }}>
                    <Typography variant="h4">My Notes</Typography>
                </Box>

                {/* Main content */}
                <Container maxWidth="lg" sx={{ padding: "16px" }}>
                    <Grid container spacing={2}>
                        {/* Add Note Button */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={() => addNote({ author: "ur mom", content: "hiii" })}>
                                Add Note
                            </Button>
                        </Grid>

                        {/* Notes list */}
                        {notes.map((note) => (
                            <Grid item xs={12} md={6} key={note.title}>
                                <Note title={note.title} summarised={note.summarised} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Home