import { Container, Typography } from "@mui/material";
import React from "react";
import { GameCardModel } from "../../../models/models";
import GameCard from "../../molecules/GameCard";
import CardCollectionManager from "../../organisms/CardCollectionManager";

const demoCard: GameCardModel = {
  defense: 2,
  flavorText: "Some cool stuff about this card",
  power: 4,
  rarity: "noble",
  name: "TestingCard",
};

const UserCollection: React.FC = () => {
  return (
    <div>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "blue",
          color: "white",
          fontFamily: "Orbitron",
        }}
      >
        UserCollection
      </Typography>
      <CardCollectionManager />
      <Container sx={{ padding: "20px", marginLeft: "150px" }}>
        <GameCard card={demoCard} />
      </Container>
    </div>
  );
};

export default UserCollection;
