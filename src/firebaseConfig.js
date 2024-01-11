import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

// REPLACE firebaseConfig HERE
const firebaseConfig = {
  apiKey: "AIzaSyC_jyNHDX0zNrTX6D89fWyH5z48SvDg3BM",
  authDomain: "notes-app-dsta.firebaseapp.com",
  projectId: "notes-app-dsta",
  storageBucket: "notes-app-dsta.appspot.com",
  messagingSenderId: "81831514697",
  appId: "1:81831514697:web:c03067c81c431102162598",
  measurementId: "G-DHJ72R3JM0",
};

// Initialize Firebase -- DO NOT CHANGE
const app = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(app);
const FIREBASE_AUTH = initializeAuth(app, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
});

export { FIREBASE_DB, FIREBASE_AUTH, app };
