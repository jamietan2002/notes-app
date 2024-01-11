import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { getAuth } from "firebase/auth";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TaggedNote = ({
  id,
  title,
  summarised,
  author,
  createdDate,
  content,
  tags,
  currentUser,
}) => {
  //auth
  const auth = getAuth();
  const username = currentUser.username;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 450, margin: 3, borderRadius: "16px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
            {author.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={<></>}
        title={
          <Typography variant="h6" fontWeight="600">
            {title}
          </Typography>
        }
        subheader={
          <>
            {createdDate.toDate().toDateString()} by {author.toUpperCase()}
          </>
        }
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          color="text.primary"
          fontSize={15}
          fontWeight={400}
          lineHeight={2}
        >
          <List component="ol" sx={{ listStyle: "none" }}>
            {Object.entries(summarised).map(([key, value], index) => (
              <ListItem
                key={key}
                sx={{
                  ...(key.toLowerCase() === username
                    ? { backgroundColor: "#ffffe0" } // Highlight matching entry
                    : {}),
                }}
              >
                <ListItemText
                  primary={`${index + 1}. ${key.toLocaleUpperCase()}`}
                  secondary={value}
                />
              </ListItem>
            ))}
          </List>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            paragraph
            variant="button"
            color="text.primary"
            fontSize={15}
            fontWeight={500}
            lineHeight={1}
          >
            Full Note:
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontSize={15}
            fontWeight={400}
            lineHeight={1.5}
            fontStyle={"italic"}
          >
            <ul>
              <li>{content}</li>
            </ul>
          </Typography>

          <Typography
            paragraph
            variant="button"
            color="text.primary"
            fontSize={15}
            fontWeight={500}
            lineHeight={1}
            marginTop={4}
          >
            Tags:
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontSize={15}
            fontWeight={400}
            lineHeight={1.5}
            fontStyle={"italic"}
          >
            {" "}
            <ul>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TaggedNote;
