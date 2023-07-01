"use client";
import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import { useGlobalContext } from "../Context/GlobalContext";
import ModalNewUsers from "../Component/Modal/modal";
import ModalUsers from "../Component/Modal/ModalEdit";
import PaginationPost from "../Component/Pagination/PaginationPost";
import ComboBox from "../Component/Search/Search";
// import GlobalContext from "../Context/GlobalContext";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "email",
    minWidth: 170,
    align: "left",
  },
  {
    id: "gender",
    label: "gender",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "status",
    minWidth: 170,
    align: "left",
  },
  {
    id: "action",
    label: "action",
    minWidth: 170,
    align: "left",
  },
];

function StickyHeadTable() {
  const {
    data,
    deleteUser,
    totalPageData,
    getUsersData,
    page,
    setPage,
    search,
  } = useGlobalContext();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const usedelete = (id) => {
    deleteUser(id);
  };

  const [open, setOpen] = useState(0);
  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(0);

  useEffect(() => {
    getUsersData();
  }, [page]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <Paper
        sx={{
          width: "70%",
          paddingBottom: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <ModalNewUsers />
          <ComboBox />
        </Box>
        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                    }}
                  >
                    <ModalUsers
                      openHandler={() => handleOpen(item.id)}
                      open={open === item.id}
                      close={handleClose}
                      editName={item.name}
                      editEmail={item.email}
                      editStatus={item.status}
                      id={item.id}
                    />
                    <Button onClick={() => usedelete(item.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationPost
          onChangePage={handleChangePage}
          page={page}
          count={totalPageData}
        />
      </Paper>
    </Box>
  );
}

export default StickyHeadTable;
