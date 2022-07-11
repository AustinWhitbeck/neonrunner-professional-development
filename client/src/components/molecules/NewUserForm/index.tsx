import { Button, Card, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/models";
import { addNewUser, handleLogin } from "../../../repository";

interface Props {
  props: {
    currentUser: User;
    setUser: Dispatch<SetStateAction<User>>;
  };
}

const NewUserForm: React.FC<Props> = ({ props }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

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
        user_id: null,
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

  const submitLogin = async (): Promise<void> => {
    const matchedUser = await handleLogin(username, password);
    if (matchedUser.length) {
      setFormErrorMessage({ message: "Login successful!", color: "success" });
      props.setUser(matchedUser[0]);
      navigate("/collection");
    } else {
      setFormErrorMessage({ message: "Login error", color: "error" });
    }
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
          onClick={returnUser ? submitLogin : handleNewUserSubmit}
          sx={{ width: "100%" }}
        >
          Submit
        </Button>
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
      </Card>
    </div>
  );
};

export default NewUserForm;
