import React from 'react'
import { FIREBASE_DB } from '../firebaseConfig'
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '.././theme'
import Header from '../components/nav/Header'
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Note from "../components/Note";


const Home = () => {
    const collectionRef = collection(FIREBASE_DB, 'notes')
    const [notes, setNotes] = useState([]);


    useEffect(() => {
        const getNotes = async () => {
            const q = query(collectionRef)
            await getDocs(q).then((note) => {
                let noteData = note.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setNotes(noteData)

            }).catch((err) => {
                console.log(err);
            })
        }
        getNotes()
    }, [])



    console.log(notes)
    console.log("hi")
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
                            <Button variant="contained" color="primary" onClick={() => addNote({ title: "New Note", content: "" })}>
                                Add Note
                            </Button>
                        </Grid>

                        {/* Notes list */}
                        {notes.map((note) => (
                            <Grid item xs={12} md={6} key={note.title}>
                                <Note title={note.author} content={note.content} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Home