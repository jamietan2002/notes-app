import { FIREBASE_DB } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const deleteNote = async (toDelete) => {
  console.log("delete");
  await deleteDoc(doc(FIREBASE_DB, "notes", toDelete));
  return;
};

export default deleteNote;
