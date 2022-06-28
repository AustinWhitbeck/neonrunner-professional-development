import { Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import VideogameAssetOffIcon from "@mui/icons-material/VideogameAssetOff";
import React from "react";
import { GameCardModel } from "../../../models/models";

interface FullCard {
  card: GameCardModel;
}

const GameCard: React.FC<FullCard> = ({ card }: FullCard) => {
  return (
    <Card
      sx={{
        width: "200px",
        height: "280px",
        textAlign: "center",
        border: "solid purple 4px",
        backgroundColor: "lightblue",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "purple", textAlign: "left" }}
      >
        {card.name}
      </Typography>
      <Container sx={{ width: "180px", height: "80px" }}>
        <div>{card.power}</div>
        <VideogameAssetOffIcon
          sx={{ backgroundColor: "cyan", color: "purple" }}
        />
        <div>{card.defense}</div>
      </Container>
      <Container
        sx={{
          width: "160px",
          height: "100px",
          padding: "5px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="body2">{card.flavorText}</Typography>
      </Container>
      <div>{card.rarity}</div>
    </Card>
  );
};

export default GameCard;
