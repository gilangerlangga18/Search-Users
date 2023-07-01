"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationPost from "./Component/Pagination/PaginationPost";

export default function Home({}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);

  const getPostData = async (page = 1) => {
    const response = await axios.get(
      `https://gorest.co.in/public/v1/posts?page=${page}`
    );
    setData(response.data.data);
    setTotalPage(response.data.meta.pagination.pages);
  };

  useEffect(() => {
    getPostData(page);
  }, [page]);

  // get data post by id

  return (
    <main>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            padding: "40px",
          }}
        >
          Post List
        </Typography>
        <Box
          sx={{
            width: "90%",
            // height: "100vh",
            display: "flex",
            flexWrap: "wrap",

            justifyContent: "space-evenly",
            // flexDirection: "column",
          }}
        >
          {data.map((item) => (
            <Box
              sx={{
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                marginBottom: "30px",
                justifyContent: "space-evenly",
                borderRadius: "10px",
                padding: "40px",
                backgroundColor: "white",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  color: "black",
                  textOverflow: "ellipsis",
                  maxHeight: "20px",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </Typography>
              <Box
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                  textOverflow: "ellipsis",
                  maxHeight: "130px",
                  overflow: "hidden",
                }}
              >
                {item.body}
              </Box>
              <Link href={`/${item.id}`}>
                <Button
                  sx={{
                    color: "#ffd14e",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  See Detail
                </Button>
              </Link>
            </Box>
          ))}
        </Box>
        <PaginationPost
          onChangePage={(page) => setPage(page)}
          page={page}
          count={totalPage}
        />
      </Box>
    </main>
  );
}
