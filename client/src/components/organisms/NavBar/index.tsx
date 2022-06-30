import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/models";

interface Props {
  user: User;
}

const NavBar: React.FC<Props> = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <Container
      disableGutters
      sx={{
        backgroundColor: "purple",
        color: "cyan",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "5px 20px",
      }}
    >
      <Typography>User: {user.username}</Typography>
      <div>
        <Button onClick={(): void => navigate("/login")} variant="outlined">
          Login
        </Button>
        <Button
          onClick={(): void => navigate("/collection")}
          variant="outlined"
        >
          Profile
        </Button>
        <Button
          onClick={(): void => navigate("/collection")}
          variant="outlined"
        >
          My Collection
        </Button>
      </div>
    </Container>
  );
};

export default NavBar;
