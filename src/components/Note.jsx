import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import deleteNote from "../functions/deleteNote";

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

const Note = ({
  id,
  title,
  summarised,
  author,
  createdDate,
  content,
  tags,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    const note = {
      id: id,
      title: title,
      content: content,
      tags: tags,
    };
    navigate("/editNote", { state: note });
  };

  const handleDelete = () => {
    deleteNote(id);
    handleClose();
    window.location.reload();
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  return (
    <Card sx={{ maxWidth: 450, margin: 3, borderRadius: "16px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[300] }} aria-label="recipe">
            {author.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              aria-labelledby="settings"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteDialog}>Delete</MenuItem>
              <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogContent>
                  <Alert severity="warning">
                    Clicking "Delete" will permanently delete your note for you
                    and all tagged users.
                  </Alert>
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={handleCloseDeleteDialog}
                    variant="outline"
                    color="primary"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    color="primary"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Menu>
          </>
        }
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
        <Typography variant="body2" color="text.primary">
          <ul>
            {Object.entries(summarised).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
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
          <Typography paragraph>Full Note:</Typography>
          <Typography paragraph>{content}</Typography>
          <Typography paragraph>Tags:</Typography>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>{" "}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Note;
