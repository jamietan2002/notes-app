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
  // let summary = toStore.summarised;
  // summary = summary.trim();
  // const lines = summary.split("\n");
  // const summaryMap = {};
  // for (const line of lines) {
  //   console.log(line);
  //   if (line.trim() === "") {
  //     continue;
  //   }
  //   const [name, text] = line.split(": ", 2);
  //   const trimmedName = name.trim().replace(/^\d+\.\s*/, "");

  //   summaryMap[trimmedName] = text.trim();
  // }

  // let createdNote = {
  //   title: toStore.title,
  //   content: toStore.content,
  //   tags: toStore.tags,
  //   author: toStore.author,
  //   summarised: summaryMap,
  // };

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
