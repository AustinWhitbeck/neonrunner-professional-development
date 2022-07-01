import { Container, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { GameCardModel, User } from "../../../models/models";
import { getAllCards, getUserCardCollection } from "../../../repository";
import GameCard from "../../molecules/GameCard";
import CardCollectionManager from "../../organisms/CardCollectionManager";

interface Props {
  currentUser: User;
}

const UserCollection: React.FC<Props> = ({ currentUser }: Props) => {
  const [allCards, setAllCards] = useState<GameCardModel[]>([]);
  const [userCollection, setUserCollection] = useState<GameCardModel[]>([]);
  const [collectionType, setCollectionType] = useState<boolean>(true);

  const handleGetAllCards = async (): Promise<void> => {
    const fetchedCards = await getAllCards();
    if (Array.isArray(fetchedCards)) {
      setAllCards(fetchedCards);
    }
  };

  const handleGetUserCollection = async (): Promise<void> => {
    console.log("handleGetUserCollection");
    console.log("current user info", currentUser);
    if (currentUser.user_id) {
      console.log("inside if statement");
      const fetchedUserCards = await getUserCardCollection(currentUser.user_id);
      if (Array.isArray(fetchedUserCards)) {
        setUserCollection(fetchedUserCards);
        console.log("fetchedUserCards value", fetchedUserCards);
      }
    }
  };

  const handleCollectionType = (): void => {
    setCollectionType(!collectionType);
  };

  useEffect(() => {
    handleGetAllCards();
    handleGetUserCollection();
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
        collection={collectionType ? allCards : userCollection}
      />
      <Container
        sx={{
          padding: "20px",
          marginLeft: "150px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {(collectionType ? allCards : userCollection).map(
          (card): ReactNode => (
            <GameCard card={card} key={card.card_id} />
          )
        )}
      </Container>
    </div>
  );
};

export default UserCollection;
