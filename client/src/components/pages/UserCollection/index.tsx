import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GameCardModel } from "../../../models/models";
import { getAllCards } from "../../../repository";
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
  const [allCards, setAllCards] = useState<GameCardModel[]>([]);
  const [userCollection, setUserCollection] = useState<GameCardModel[]>([]);
  const [collectionType, setCollectionType] = useState<boolean>(true);

  const handleGetAllCards = async (): Promise<void> => {
    console.log("in handleGetAllUsers");
    const fetchedCards = await getAllCards();
    if (Array.isArray(fetchedCards)) {
      setAllCards(fetchedCards);
    }
  };

  const handleCollectionType = (): void => {
    setCollectionType(!collectionType);
  };

  useEffect(() => {
    handleGetAllCards();
  }, []);

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
      <CardCollectionManager handleCollectionType={handleCollectionType} />
      <Container sx={{ padding: "20px", marginLeft: "150px" }}>
        <GameCard card={demoCard} />
      </Container>
    </div>
  );
};

export default UserCollection;
