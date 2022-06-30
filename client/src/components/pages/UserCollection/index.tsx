import { Container, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { GameCardModel } from "../../../models/models";
import { getAllCards } from "../../../repository";
import GameCard from "../../molecules/GameCard";
import CardCollectionManager from "../../organisms/CardCollectionManager";

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
      <CardCollectionManager
        handleCollectionType={handleCollectionType}
        collectionType={collectionType}
      />
      <Container
        sx={{
          padding: "20px",
          marginLeft: "150px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {allCards.map(
          (card): ReactNode => (
            <GameCard card={card} />
          )
        )}
      </Container>
    </div>
  );
};

export default UserCollection;
