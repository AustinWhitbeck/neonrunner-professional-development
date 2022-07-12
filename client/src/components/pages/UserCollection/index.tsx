import { Box, Container, LinearProgress, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { cardRaritySort } from "../../../helpers/cardRaritySort";
import { FormattedFilters, GameCardModel, User } from "../../../models/models";
import {
  getAllCards,
  getAllCardsWithFilters,
  getUserCardCollection,
  getUserCardCollectionWithFilters2,
} from "../../../repository";
import AddOneRandomCard from "../../atoms/AddOneRandomCard";
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
  const [rarityFilters, setRarityFilters] = React.useState({
    royal: false,
    noble: false,
    artisan: false,
    peasant: false,
  });

  // TODO: experimental for building sql statement
  const [nameSearch, setNameSearch] = useState<string>("");

  const handleNameSearchClear = async (): Promise<void> => {
    let fetchedCards: string | GameCardModel[] = [];
    if (collectionType) {
      fetchedCards = await getAllCards();
    } else {
      fetchedCards = await getUserCardCollection(currentUser.user_id as number);
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
      const fetchedUserCards = await getUserCardCollection(currentUser.user_id);
      if (Array.isArray(fetchedUserCards)) {
        setUserCollection(fetchedUserCards);
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
    setRarityFilters({
      royal: false,
      noble: false,
      artisan: false,
      peasant: false,
    });
  };

  const toggleFiltersModal = (): void => {
    setFiltersModalOpen(!filtersModalOpen);
  };

  // Name Search functions

  const handleSearchTextChange = (text: string): void => {
    setNameSearch(text);
  };

  const handleAllFiltersSubmit = (): void => {
    const formattedFilters: FormattedFilters = {
      rarityValues: [1, 2, 3, 4],
    };
    const rarityValues = cardRaritySort(rarityFilters);
    if (rarityValues.length) {
      formattedFilters.rarityValues = rarityValues;
    }
    if (nameSearch) {
      formattedFilters.nameSearch = nameSearch;
    }
    if (collectionType) {
      getAllCardsWithFilters(formattedFilters).then((data) => {
        console.log("data value", data);
        setAllCards(data as GameCardModel[]);
        setFiltersModalOpen(false);
      });
    } else {
      formattedFilters.id = currentUser.user_id as number;
      getUserCardCollectionWithFilters2(formattedFilters).then((data) => {
        console.log("data value", data);
        setUserCollection(data as GameCardModel[]);
        setFiltersModalOpen(false);
      });
    }
  };

  const handleModalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRarityFilters({
      ...rarityFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleResetRarityFilters = async (): Promise<void> => {
    let fetchedCards: string | GameCardModel[] = [];
    if (collectionType) {
      fetchedCards = await getAllCards();
    } else {
      fetchedCards = await getUserCardCollection(currentUser.user_id as number);
    }
    if (Array.isArray(fetchedCards)) {
      if (collectionType) {
        setAllCards(fetchedCards);
      } else {
        setUserCollection(fetchedCards);
      }
    }
    setRarityFilters({
      royal: false,
      noble: false,
      artisan: false,
      peasant: false,
    });
    toggleFiltersModal();
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
          <Box>
            <SearchBar
              handleSubmit={handleAllFiltersSubmit}
              handleClear={handleNameSearchClear}
              nameSearch={nameSearch}
              setSearchText={handleSearchTextChange}
            />
            <AddOneRandomCard
              currentUser={currentUser}
              handleGetUserCollection={handleGetUserCollection}
            />
          </Box>
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
          filterValues={rarityFilters}
          toggleFiltersModal={toggleFiltersModal}
          handleModalChange={handleModalChange}
          handleFiltersSubmit={handleAllFiltersSubmit}
          handleResetRarityFilters={handleResetRarityFilters}
        />
      </Box>
    </>
  );
};

export default UserCollection;
