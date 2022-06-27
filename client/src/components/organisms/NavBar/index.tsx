import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const NavBar: React.FC = () => {
  return (
    <div>
      <Typography>Nav Bar</Typography>
      <Button onClick={(): void => navigate("/login")}>Login</Button>
    </div>
  );
};

export default NavBar;
