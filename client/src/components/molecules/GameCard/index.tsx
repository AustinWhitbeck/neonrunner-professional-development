import { Card, Typography } from "@mui/material";
import React from "react";
// import { CardContainer } from "./GameCard.styles";

const GameCard: React.FC = () => {
  return (
    <Card sx={{ width: "200px", height: "300px", textAlign: "center" }}>
      <Typography variant="subtitle1" sx={{ color: "purple" }}>
        Card Name
      </Typography>
    </Card>
  );
};

export default GameCard;
