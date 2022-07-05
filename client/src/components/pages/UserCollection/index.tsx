import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { GameCardModel, User } from "../../../models/models";
import {
  getAllCards,
  getAllCardsWithFilters,
  getUserCardCollection,
} from "../../../repository";
import GameCard from "../../molecules/GameCard";
import CardCollectionManager from "../../organisms/CardCollectionManager";

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

  const { royal, noble, artisan, peasant } = filterValues;

  const handleGetAllCards = async (): Promise<void> => {
    const fetchedCards = await getAllCards();
    if (Array.isArray(fetchedCards)) {
      setAllCards(fetchedCards);
    }
    toggleFiltersModal();
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
      toggleFiltersModal();
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
        toggleFiltersModal={toggleFiltersModal}
        collectionType={collectionType}
        collection={collectionType ? allCards : userCollection}
      />
      <Box sx={{ width: "100%" }}>
        {loading ? <LinearProgress variant="indeterminate" /> : ""}
      </Box>
      <Container
        sx={{
          padding: "20px",
          marginLeft: "150px",
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
      <Modal
        open={filtersModalOpen}
        onClose={toggleFiltersModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{ backgroundColor: "red", padding: "20px", borderRadius: "5px" }}
        >
          <FormControl component="fieldset" variant="standard">
            <FormLabel>Collection Filters</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={royal}
                    onChange={handleChange}
                    name="royal"
                    value={1}
                  />
                }
                label="Royal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noble}
                    onChange={handleChange}
                    name="noble"
                  />
                }
                label="Noble"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={artisan}
                    onChange={handleChange}
                    name="artisan"
                  />
                }
                label="Artisan"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={peasant}
                    onChange={handleChange}
                    name="peasant"
                  />
                }
                label="Peasant"
              />
            </FormGroup>
          </FormControl>
          <Button onClick={handleFiltersSubmit}>Apply Filters</Button>
          <Button onClick={handleGetAllCards}>Reset Filters</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserCollection;
