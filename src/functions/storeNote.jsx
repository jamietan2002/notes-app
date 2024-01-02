import { FIREBASE_DB } from "../firebaseConfig";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const notesRef = doc(collection(FIREBASE_DB, "notes"));

const storeNote = async (toStore) => {
  //make it a map
  const summary = toStore.summarised;
  const lines = summary.split("\n");
  const summaryMap = {};
  for (const line of lines) {
    // if (/^\d+\.\s:.*/.test(line)) {
    console.log(line);
    // Extract name and text
    const [name, text] = line.split(": ", 2);
    const trimmedName = name.trim();

    summaryMap[trimmedName] = text.trim();
  }
  console.log(summaryMap);
  //update data
  const createdNote = {
    title: toStore.title,
    content: toStore.content,
    tags: toStore.tags,
    author: toStore.author,
    summarised: summaryMap,
    createdDate: Timestamp.fromDate(new Date()),
  };
  console.log(createdNote);

  //store in firebase

  await setDoc(notesRef, createdNote);

  //return raw note
  return toStore.content;
};

export default storeNote;
