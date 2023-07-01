"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import ComboBox from "./Search/Search";
import Link from "next/link";

function Navbar() {
  return (
    <div>
      {" "}
      <Box
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: "#ffd14e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "100px",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                Post
              </Typography>
            </Link>

            <Link href="/Users">
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                Users
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Navbar;
