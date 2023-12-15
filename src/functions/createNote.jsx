import { FIREBASE_DB } from '../firebaseConfig'
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";

const notesRef = collection(FIREBASE_DB, 'notes')

const createNote = async (note) => {
    console.log("creating note")
    //fetch all users 


    //create prompt

    //send to chatgpt

    //store response for each user that is mentioned in the note

    //return raw note




}

export default createNote