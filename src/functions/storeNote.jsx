import { FIREBASE_DB } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const notesRef = doc(collection(FIREBASE_DB, "notes"));

const storeNote = async (toStore) => {
  if (toStore.id) {
    // Update existing document
    await updateDoc(doc(FIREBASE_DB, "notes", toStore.id), toStore);
  } else {
    //create new document
    toStore.createdDate = Timestamp.fromDate(new Date());
    await setDoc(notesRef, toStore);
  }
  return toStore.content;
};

export default storeNote;
