"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGlobalContext } from "@/app/Context/GlobalContext";
import { useDebounce } from "@/app/Hooks/useDebounce";

export default function ComboBox() {
  const { search, setSearch, getUsersData, setPage } = useGlobalContext();
  const debouncedValue = useDebounce(search);
  React.useEffect(() => {
    setPage(1);
    getUsersData();
  }, [debouncedValue]);

  return (
    <TextField
      sx={{ width: "340px" }}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      label="Search User"
    />
  );
}
