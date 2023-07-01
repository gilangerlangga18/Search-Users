"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function DetailPost() {
  const { id } = useParams();
  //  get post byid
  const baseUrl = "https://gorest.co.in/public/v1/posts";
  const [data, setData] = useState([]);
  const [dataComent, setDataComent] = useState([]);
  const [isLoadComment, setIsLoadComment] = useState(true);

  const getPostByid = async () => {
    const response = await axios.get(`${baseUrl}/${id}`);
    setData(response.data.data);
  };

  // get comments byid
  const getCommentByid = async () => {
    const response = await axios.get(`${baseUrl}/${id}/comments`);
    setDataComent(response.data.data);
    setIsLoadComment(false);
  };

  useEffect(() => {
    getPostByid();
    getCommentByid();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "700px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              marginBottom: "30px",
              textAlign: "center",
              justifyContent: "space-evenly",
              borderRadius: "30px",
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
              }}
            >
              {data.title}
            </Typography>
            <Box
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                textAlign: "start",
              }}
            >
              {data.body}
            </Box>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "600",
          }}
        >
          Comments
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "700px",
            flexDirection: "column",
          }}
        >
          {isLoadComment ? (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                display: "flex",
                gap: "20px",
              }}
            >
              Loading
            </Typography>
          ) : dataComent.length === 0 ? (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                display: "flex",
                gap: "20px",
              }}
            >
              No comment in this post
            </Typography>
          ) : (
            dataComent.map((item) => (
              <Box
                sx={{
                  width: "700px",
                  // height: "400px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "20px",
                  textAlign: "left",
                  justifyContent: "space-evenly",
                  borderRadius: "20px",
                  padding: "20px",
                  backgroundColor: "white",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      color: "#1e252a",
                    }}
                  >
                    By :{item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      color: "#7e7774 ",
                    }}
                  >
                    email : {item.email}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {item.body}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DetailPost;
