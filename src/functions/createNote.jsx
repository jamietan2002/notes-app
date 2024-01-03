import { FIREBASE_DB } from "../firebaseConfig";
import OpenAI from "openai";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: `${API_KEY}`,
  dangerouslyAllowBrowser: true,
});

const notesRef = doc(collection(FIREBASE_DB, "notes"));

const createNote = async (data) => {
  //create prompt
  const prompt =
    "If 'i' is used, replace it with 'Myself'. For each person mentioned in this note, summarise the part that is relevant to the person. If no person is mentioned, treat it as a 'Myself'.Start each person with a number bullet form, in this format: 'name: summary'. " +
    data.content;
  console.log(prompt);

  //send to chatgpt
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
  });
  const summary = completion.choices[0].message.content;

  console.log(completion.choices[0]);
  console.log(summary);

  return summary;
};

export default createNote;
