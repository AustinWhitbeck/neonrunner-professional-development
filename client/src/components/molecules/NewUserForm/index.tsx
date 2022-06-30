import { Button, Card, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../../models/models";
import { addNewUser, getAllUsers } from "../../../repository";

interface Props {
  props: {
    currentUser: User;
    setUser: Dispatch<SetStateAction<User>>;
  };
}

const NewUserForm: React.FC<Props> = ({ props }: Props) => {
  // const { currentUser } = useContext(userContext);
  // console.log("current user value", currentUser);

  // TODO: Look at Contact Support in molecules in the PWA
  // As an example of making this whole structure into an object to iterate over.
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [allUsers, setAllUsers] = useState<User[]>([]);

  // start with return, then if signup is clicked change form to signup.
  const [returnUser, setReturnUser] = useState<boolean>(true);
  const [formMessage, setFormErrorMessage] = useState<{
    message: string;
    color: string;
  }>({
    message: "",
    color: "success",
  });

  const textfieldStyle = {
    marginBottom: "20px",
  };

  const handleSignUp = (): void => {
    setReturnUser(!returnUser);
  };

  const handleNewUserSubmit = (): void => {
    if (
      password === passwordConfirm &&
      password !== "" &&
      username !== "" &&
      name !== ""
    ) {
      const newUserObject = {
        name,
        username,
        password,
        avatar:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      };
      addNewUser(newUserObject);
    }
    if (password !== passwordConfirm) {
      setFormErrorMessage({ message: "Password Mismatch", color: "error" });
    } else if (username === "" || name === "") {
      setFormErrorMessage({
        message: "Please Fill out all fields",
        color: "error",
      });
    }
  };

  const checkUserMatch = (): void => {
    const matchedUser = allUsers.find((user) => user.username == username);
    if (matchedUser) {
      setFormErrorMessage({ message: "Login successful!", color: "success" });
      props.setUser(matchedUser);
    } else {
      setFormErrorMessage({ message: "Login error", color: "error" });
    }
  };

  const handleGetAllUsers = async (): Promise<void> => {
    console.log("in handleGetAllUsers");
    const fetchedUsers = await getAllUsers();
    console.log(
      "🚀 ~ file: index.tsx ~ line 31 ~ handleGetAllUsers ~ fetchedUsers",
      fetchedUsers
    );
    if (Array.isArray(fetchedUsers)) {
      setAllUsers(fetchedUsers);
    }
  };

  useEffect((): void => {
    console.log("use effect on form");
    handleGetAllUsers();
  }, []);

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
        <Typography
          variant="h4"
          sx={{ marginBottom: "20px", fontFamily: "orbitron" }}
        >
          {returnUser ? "Login" : "Sign Up"}
        </Typography>
        <Typography color={formMessage.color} sx={textfieldStyle}>
          {formMessage.message}
        </Typography>
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
        {!returnUser ? (
          <>
            <TextField
              label="Confirm Password"
              value={passwordConfirm}
              color={
                password === passwordConfirm && password.length > 0
                  ? "primary"
                  : "error"
              }
              onChange={(e): void => {
                setPasswordConfirm(e.target.value);
              }}
              sx={textfieldStyle}
            />
            <TextField
              label="Name"
              value={name}
              onChange={(e): void => {
                setName(e.target.value);
              }}
              sx={textfieldStyle}
            />
          </>
        ) : (
          ""
        )}

        <Button
          onClick={handleSignUp}
          sx={{
            width: "100%",
            fontSize: "10px",
            color: "black",
          }}
        >
          {returnUser ? "Sign-Up" : "Cancel Sign Up"}
        </Button>
        <Button
          onClick={returnUser ? checkUserMatch : handleNewUserSubmit}
          sx={{ width: "100%" }}
        >
          Submit
        </Button>
        <Button onClick={handleGetAllUsers} sx={{ width: "100%" }}>
          Get all Users
        </Button>
      </Card>
    </div>
  );
};

export default NewUserForm;
