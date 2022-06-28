import { Button, Card, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { ReactNode, useState } from "react";
import { User } from "../../../models/models";
import { addNewUser, getAllUsers } from "../../../repository";

const index: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

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

  const handleGetAllUsers = (): void => {
    const fetchedUsers = getAllUsers();
    console.log("fetchedUsers value", fetchedUsers);
    setAllUsers(fetchedUsers);
  };

  return (
    <div>
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
        <Button onClick={handleGetAllUsers} sx={{ width: "100%" }}>
          Get all Users
        </Button>
      </Card>
      <Container>
        {allUsers.length > 0
          ? allUsers.map(
              (user): ReactNode => <Typography>{user.name}</Typography>
            )
          : ""}
      </Container>
    </div>
  );
};

export default index;
