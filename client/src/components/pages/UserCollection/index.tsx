import { Box, Container, LinearProgress, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { GameCardModel, User } from "../../../models/models";
import {
  getAllCards,
  getAllCardsSearchMatch,
  getAllCardsWithFilters,
  getUserCardCollection,
  getUserCardCollectionSearchMatch,
} from "../../../repository";
import GameCard from "../../molecules/GameCard";
import CardCollectionManager from "../../organisms/CardCollectionManager";
import RarityFiltersForm from "../../organisms/RarityFiltersForm";
import SearchBar from "../../organisms/SearchBar";

interface Props {
  currentUser: User;
}

const UserCollection: React.FC<Props> = ({ currentUser }: Props) => {
  const [allCards, setAllCards] = useState<GameCardModel[]>([]);
  const [userCollection, setUserCollection] = useState<GameCardModel[]>([]);

  const [collectionType, setCollectionType] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtersModalOpen, setFiltersModalOpen] = useState<boolean>(false);
  const [filterValues, setFilterValues] = React.useState({
    royal: false,
    noble: false,
    artisan: false,
    peasant: false,
  });

  const handleNameSearch = async (text: string): Promise<void> => {
    console.log(`search name search ${text}`);
    let fetchedCards: string | GameCardModel[] = [];
    if (collectionType) {
      fetchedCards = await getAllCardsSearchMatch(text);
    } else {
      fetchedCards = await getUserCardCollectionSearchMatch(
        currentUser.user_id as number,
        text
      );
    }
    if (Array.isArray(fetchedCards)) {
      if (collectionType) {
        setAllCards(fetchedCards);
      } else {
        setUserCollection(fetchedCards);
      }
    }
  };

  const handleGetAllCards = async (): Promise<void> => {
    const fetchedCards = await getAllCards();
    if (Array.isArray(fetchedCards)) {
      setAllCards(fetchedCards);
    }
    setFiltersModalOpen(false);
    setLoading(false);
  };

  const handleGetUserCollection = async (): Promise<void> => {
    if (currentUser.user_id) {
      setLoading(true);
      console.log("inside if statement");
      const fetchedUserCards = await getUserCardCollection(currentUser.user_id);
      if (Array.isArray(fetchedUserCards)) {
        setUserCollection(fetchedUserCards);
        console.log("fetchedUserCards value", fetchedUserCards);
      }
    }
    setLoading(false);
  };

  const handleCollectionType = (): void => {
    setLoading(true);
    setCollectionType(!collectionType);
    if (collectionType) {
      handleGetAllCards();
    } else {
      handleGetUserCollection();
    }
  };

  const toggleFiltersModal = (): void => {
    setFiltersModalOpen(!filtersModalOpen);
  };

  const handleFiltersSubmit = (): void => {
    console.log("handle filters submit");
    console.log("filterValues value on userCollection", filterValues);
    getAllCardsWithFilters(filterValues).then((data) => {
      console.log("data value", data);
      setAllCards(data as GameCardModel[]);
      setFiltersModalOpen(false);
    });
  };

  const handleModalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    handleGetAllCards();
    handleGetUserCollection();
  }, []);

  return (
    <>
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardCollectionManager
          handleCollectionType={handleCollectionType}
          toggleFiltersModal={toggleFiltersModal}
          collectionType={collectionType}
          collection={collectionType ? allCards : userCollection}
        />
        <Box width="100%" padding="10px">
          <SearchBar
            handleSubmit={handleNameSearch}
            handleClear={handleGetAllCards}
          />
          <Box marginTop="10px" sx={{ width: "100%" }}>
            {loading ? <LinearProgress variant="indeterminate" /> : ""}
          </Box>
          <Container
            sx={{
              padding: "20px",
              display: loading ? "none" : "flex",
              flexWrap: "wrap",
            }}
          >
            {(collectionType ? allCards : userCollection).map(
              (card): ReactNode => (
                <GameCard card={card} key={card.card_id} />
              )
            )}
          </Container>
        </Box>
        <RarityFiltersForm
          filtersModalOpen={filtersModalOpen}
          filterValues={filterValues}
          toggleFiltersModal={toggleFiltersModal}
          handleModalChange={handleModalChange}
          handleFiltersSubmit={handleFiltersSubmit}
          handleGetAllCards={handleGetAllCards}
        />
      </Box>
    </>
  );
};

export default UserCollection;
