import { Typography } from "@mui/material";
import React from "react";
import GameCard from "../../molecules/GameCard";

const UserCollection: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">UserCollection</Typography>
      <div>
        <GameCard />
      </div>
    </div>
  );
};

export default UserCollection;
