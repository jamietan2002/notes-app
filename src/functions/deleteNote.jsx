import { FIREBASE_DB } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const deleteNote = async (toDelete) => {
  try {
    const deleted = await deleteDoc(doc(FIREBASE_DB, "notes", toDelete));
    window.location.reload();
  } catch (error) {
    alert("Error deleting document");
  }
  return;
};

export default deleteNote;
