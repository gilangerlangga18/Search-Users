import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationPost({ page = 0, count = 0, onChangePage }) {
  return (
    <Stack
      spacing={4}
      sx={{
        alignItems: "end",
        display: "flex",
        margin: "30px",
      }}
    >
      <Pagination
        page={page}
        count={count}
        onChange={(_, page) => {
          onChangePage(page);
        }}
        shape="rounded"
      />
    </Stack>
  );
}
