import React, { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const SummaryTable = ({ summaryMap, onSummaryChange }) => {
  const [summary, setSummary] = useState(summaryMap);

  const handleCellChange = (key, newValue) => {
    setSummary((prevSummary) => {
      const newSummary = { ...prevSummary };

      // Update the value

      newSummary[key] = newValue;
      onSummaryChange(newSummary);

      return newSummary;
    });
  };

  const deleteCell = (key) => {
    setSummary((prevSummary) => {
      const newSummary = { ...prevSummary };
      delete newSummary[key];

      console.log(newSummary);
      onSummaryChange(newSummary);

      return newSummary;
    });
  };

  return (
    <Box sx={{ marginBottom: 2, width: "90%" }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 1,
          borderRadius: "10px",
          bgcolor: "#F5F5F5",
          marginTop: 4,
        }}
      >
        <Table
          sx={{ minWidth: 650, borderRadius: 20 }}
          aria-label="Editable summary table"
        >
          <TableHead sx={{ backgroundColor: "grey.200" }}>
            <TableRow
              sx={{
                borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <TableCell
                sx={{
                  fontSize: "16px",
                }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                }}
              >
                Note
              </TableCell>
              <TableCell /> {/* For delete button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary).map(([key, value], index) => (
              <TableRow
                key={index}
                sx={{ borderBottom: "0px solid rgba(0, 0, 0, 0.12)" }}
              >
                <TableCell>{key}</TableCell>
                <TableCell>
                  <TextField
                    value={value}
                    onChange={(e) => handleCellChange(key, e.target.value)}
                    fullWidth
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteCell(key)} size="small">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SummaryTable;
