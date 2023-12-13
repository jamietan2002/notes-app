import React from "react";
import { Box, Typography } from "@mui/material";

const Note = ({ title, content }) => {
    return (
        <Box sx={{ padding: "16px", borderRadius: 4, border: "1px solid #ddd", marginBottom: 16 }}>
            <Typography variant="h6" fontWeight="bold">Note by: {title}</Typography>
            <Typography variant="body1">Summary: {content}</Typography>
        </Box>
    );
};

export default Note;
