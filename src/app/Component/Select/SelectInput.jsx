import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";

export default function SelectInput({
  value,
  change,
  dataValueA,
  dataValueB,
  title,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="status"
          onChange={change}
        >
          <MenuItem value={dataValueA}>{dataValueA}</MenuItem>
          <MenuItem value={dataValueB}>{dataValueB}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
