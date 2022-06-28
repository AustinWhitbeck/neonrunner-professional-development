import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addNewUser, getAllUsers } from "../../../repository";

const index: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const textfieldStyle = {
    marginBottom: "20px",
    borderColor: "red",
  };

  const handleNewUserSubmit = (): void => {
    const newUserObject = {
      name,
      username,
      password,
      avatar:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    };
    addNewUser(newUserObject);
  };

  return (
    <Card
      sx={{
        width: "300px",
        padding: "20px",
        textAlign: "center",
        display: "block",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Login Card
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e): void => {
          setName(e.target.value);
        }}
        sx={textfieldStyle}
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e): void => {
          setUsername(e.target.value);
        }}
        sx={textfieldStyle}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e): void => {
          setPassword(e.target.value);
        }}
        sx={textfieldStyle}
      />
      <Button onClick={handleNewUserSubmit} sx={{ width: "100%" }}>
        Submit
      </Button>
      <Button onClick={getAllUsers} sx={{ width: "100%" }}>
        Get all Users
      </Button>
    </Card>
  );
};

export default index;
