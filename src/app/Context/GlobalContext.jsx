"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalContextProvider({ children }) {
  const baseurl = "https://gorest.co.in/public/v1/users";
  const token =
    "b17381e70359111c6be8d7fa16701d92ec96096ad6c97a0c5df81f2e8b48acef";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalPageData, setTotalPageData] = useState(1);

  // get data all user

  const getUsersData = async () => {
    const response = await axios.get(`${baseurl}?page=${page}&name=${search}`);
    setData(response.data.data);
    setTotalPageData(response.data.meta.pagination.pages);
  };

  const deleteUser = async (id) => {
    let confirmAction = confirm("Are you sure to execute this action?");
    if (confirmAction) {
      await axios.delete(`${baseurl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      setData(data.filter((item) => item.id !== id));
      alert("Action successfully executed");
    } else {
      alert("Action canceled");
    }
  };

  // edit data

  const updateNewUser = async (id, newName, newEmail, newStatus) => {
    const newUser = {
      name: newName,
      email: newEmail,
      status: newStatus,
    };

    const res = await axios.patch(`${baseurl}/${id}`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newUserData = {
      name: res.data.data.name,
      email: res.data.data.email,
      status: res.data.data.status,
    };
    const indexData = data.findIndex((item) => item.id === res.data.data.id);
    setData([
      ...data.slice(0, indexData),
      { ...data[indexData], ...newUserData },
      ...data.slice(indexData + 1),
    ]);
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        deleteUser,
        updateNewUser,
        getUsersData,
        totalPageData,
        page,
        setPage,
        search,
        setSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
