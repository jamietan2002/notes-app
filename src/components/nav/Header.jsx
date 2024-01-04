import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH).then(navigate("/login"));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              component={Link}
              variant="outline"
              color="primary"
              to="/home"
            >
              Home
            </Button>
            <Button
              onClick={handleLogoutDialog}
              variant="outline"
              color="primary"
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Clicking "Logout" will terminate your current session.
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseLogoutDialog}
            variant="outline"
            color="primary"
          >
            Cancel
          </Button>

          <Button onClick={handleLogout} variant="outline" color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Header;
