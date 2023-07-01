import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import axios from "axios";
import SelectInput from "../Select/SelectInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalNewUsers() {
  // const { createNewUser, open, handleClose, handleOpen } = useGlobalContext();

  const baseurl = "https://gorest.co.in/public/v1/users";

  const token =
    "b17381e70359111c6be8d7fa16701d92ec96096ad6c97a0c5df81f2e8b48acef";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangename = (event) => {
    setName(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  // create user

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setGender("");
    setStatus("");
  };

  const createNewUser = async () => {
    const data = {
      name: name,
      email: email,
      gender: gender,
      status: status,
    };

    try {
      const res = await axios.post(baseurl, data, {
        headers: {
          " Authorization": `Bearer ${token}`,
        },
      });
      handleClose();
      alert(`succes input data Name : ${name} , ID :${res.data.data.id}`);
    } catch (error) {
      handleOpen();
      setName("");
      setEmail("");
      setGender("");
      alert(error);
    }
  };
  const handleSubmit = () => {
    createNewUser();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          width: "150px",
          height: "50px",
          backgroundColor: "#98e5bb",
          display: "flex",
          alignSelf: "end",
          color: "black",
        }}
      >
        New USers
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Input
                type="text"
                placeholder="username"
                value={name}
                onChange={handleChangename}
              />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={handleChangeEmail}
              />
              <SelectInput
                value={gender}
                change={handleChangeGender}
                dataValueA={"male"}
                dataValueB={"female"}
                title={"gender"}
              />

              <SelectInput
                value={status}
                change={handleChangeStatus}
                dataValueA={"active"}
                dataValueB={"inactive"}
                title={"status"}
              />

              <Button onClick={handleSubmit}>Input</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
