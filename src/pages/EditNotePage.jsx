import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { FIREBASE_DB, app } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Header from "../components/nav/Header";
import { Typography } from "antd";
import createNote from "../functions/createNote";
import { useNavigate, useLocation } from "react-router-dom";

const EditNote = () => {
  const { state } = useLocation();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const [tags, setTags] = useState(state.tags);
  const userRef = collection(FIREBASE_DB, "users");
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from users collection and store in state
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence).then(() => {
      const user = auth.currentUser;
      if (user) {
        console.log(user.email);
        setCurrentUser(user.email);
        const getUsers = async () => {
          const q = query(userRef);
          await getDocs(q)
            .then((user) => {
              let userData = user.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              //user.email
              setUsers(userData);
              console.log(userData);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUsers();
      } else {
        console.log("user not signed in");
      }
    });
  }, []);

  const onSubmit = async (title, content, tags) => {
    // Create new note object and save to database
    setIsLoading(true);
    const editedNote = {
      id: state.id,
      title: title,
      content: content,
      tags: tags,
      author: currentUser,
    };

    if (!title.trim()) {
      alert("Please enter a title for your note.");
      setIsLoading(false);
      return;
    }
    if (!content.trim()) {
      alert("Please enter content for your note.");
      setIsLoading(false);
      return;
    }

    await createNote(editedNote).then((summary) => {
      editedNote.summary = summary;
      navigate("/submitNote", { state: editedNote });
      setIsLoading(false);
    });
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <CircularProgress
            size={44}
            sx={{ marginRight: 10 }}
            color="inherit"
          />
        )}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Note Title"
            variant="outlined"
            color="info"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Write your note..."
            variant="outlined"
            color="info"
            required
            multiline
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <Typography variant="h2">Tags (Multiple Choices)</Typography>
            <FormGroup color="info" name="tags">
              {users.map((user) => (
                <FormControlLabel
                  key={user.email}
                  control={
                    <Checkbox
                      checked={tags.includes(user.email)}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        if (isChecked) {
                          setTags([...tags, user.email]);
                        } else {
                          setTags(tags.filter((t) => t !== user.email));
                        }
                      }}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={user.email}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            onClick={() => onSubmit(title, content, tags)}
          >
            Edit Note
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditNote;