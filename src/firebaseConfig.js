// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserSessionPersistence,
  getAuth
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPJEDN1vl2kzB9lhWWm5Y3kruDC2s-jEQ",
  authDomain: "meocopyjamie.firebaseapp.com",
  projectId: "meocopyjamie",
  storageBucket: "meocopyjamie.appspot.com",
  messagingSenderId: "944841037291",
  appId: "1:944841037291:web:5c0b8b6f8bd2c51f93f5ae",
  measurementId: "G-PG7SYCSFRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(app);
// const FIREBASE_AUTH = getAuth(app);
const FIREBASE_AUTH = initializeAuth(app, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
});
export { FIREBASE_DB, FIREBASE_AUTH, app };
