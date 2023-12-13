// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_jyNHDX0zNrTX6D89fWyH5z48SvDg3BM",
    authDomain: "notes-app-dsta.firebaseapp.com",
    projectId: "notes-app-dsta",
    storageBucket: "notes-app-dsta.appspot.com",
    messagingSenderId: "81831514697",
    appId: "1:81831514697:web:c03067c81c431102162598",
    measurementId: "G-DHJ72R3JM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(app);
export { FIREBASE_DB }


