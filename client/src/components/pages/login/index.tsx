import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import NewUserForm from "../../molecules/NewUserForm";

const Login: React.FC = () => {
  return (
    <div>
      <Typography variant="h1">Login Screen</Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <NewUserForm />
      </Container>
    </div>
  );
};

export default Login;
