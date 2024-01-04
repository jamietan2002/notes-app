import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
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
import createNote from "../functions/createNote";
import { useNavigate, useLocation } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

const AddNote = () => {
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
    const newNote = {
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
    console.log(newNote);

    await createNote(newNote).then((summary) => {
      console.log(summary);
      newNote.summary = summary;
      navigate("/submitNote", { state: newNote });
      setIsLoading(false);
    });
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          width: "100vw",
          marginTop: "80px",
        }}
      >
        {isLoading && (
          <CircularProgress
            size={44}
            sx={{ marginRight: 10 }}
            color="inherit"
          />
        )}
        <Typography variant="h6" margin={3}>
          ADD NOTE
        </Typography>
        <Box sx={{ marginBottom: 2, width: "80%" }}>
          <TextField
            label="Note Title"
            variant="outlined"
            color="info"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            fullWidth
            InputProps={{
              style: {
                borderRadius: "15px",
              },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2, width: "80%" }}>
          <TextField
            label="Write your note..."
            variant="outlined"
            color="info"
            required
            multiline
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            fullWidth={true}
            InputProps={{
              style: {
                borderRadius: "20px",
              },
            }}
          />
        </Box>
        <Box sx={{ margin: 2, width: "80%" }}>
          <FormControl fullWidth sx={{ margin: 1 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Tags (Multiple Choices)
            </Typography>
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
                      icon={<BookmarkBorderOutlinedIcon />}
                      checkedIcon={<BookmarkOutlinedIcon />}
                      sx={{
                        color: grey[900],
                        "&.Mui-checked": {
                          color: grey[700],
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
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={isLoading}
            onClick={() => onSubmit(title, content, tags)}
          >
            + Add note
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddNote;
