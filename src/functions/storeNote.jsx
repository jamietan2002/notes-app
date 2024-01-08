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
  let summary = toStore.summarised;
  summary = summary.trim();
  const lines = summary.split("\n");
  const summaryMap = {};
  for (const line of lines) {
    const [name, text] = line.split(": ", 2);
    const trimmedName = name.trim().replace(/^\d+\.\s*/, "");

    summaryMap[trimmedName] = text.trim();
  }

  const createdNote = {
    title: toStore.title,
    content: toStore.content,
    tags: toStore.tags,
    author: toStore.author,
    summarised: summaryMap,
    createdDate: Timestamp.fromDate(new Date()),
  };

  if (toStore.id) {
    // Update existing document
    console.log(toStore.id);
    await updateDoc(doc(FIREBASE_DB, "notes", toStore.id), createdNote);
  } else {
    await setDoc(notesRef, createdNote);
  }
  return toStore.content;
};

export default storeNote;
