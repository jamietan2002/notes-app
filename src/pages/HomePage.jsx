import React from 'react'
import { FIREBASE_DB } from '../firebaseConfig'
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '.././theme'
import Button from '@mui/material/Button';


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
    return (
        <>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                    Primary Button
                </Button>

                <div>home</div>
            </ThemeProvider>
        </>
    )
}

export default Home