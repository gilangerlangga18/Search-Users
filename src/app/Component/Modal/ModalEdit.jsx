import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import axios from "axios";
import SelectInput from "../Select/SelectInput";
import { useGlobalContext } from "@/app/Context/GlobalContext";

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

export default function ModalUsers({
  open,
  close,
  editName,
  editEmail,
  editStatus,
  openHandler,
  id,
}) {
  const { updateNewUser } = useGlobalContext();

  const [email, setEmail] = useState(editEmail);
  const [name, setName] = useState(editName);
  const [status, setStatus] = useState(editStatus);

  useEffect(() => {
    setEmail(editEmail);
    setName(editName);
    setStatus(editStatus);
  }, [editName, editEmail, editStatus]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangename = (event) => {
    setName(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const submit = () => {
    updateNewUser(id, name, email, status);
    setName("");
    setEmail("");
    setStatus("");
    close();
  };

  return (
    <div>
      <Button onClick={openHandler}>Edit</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
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
                value={status}
                change={handleChangeStatus}
                dataValueA={"active"}
                dataValueB={"inactive"}
                title={"status"}
              />

              <Button onClick={submit}>Input</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
