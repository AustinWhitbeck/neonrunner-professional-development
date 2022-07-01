import { Button, Container, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GiMaterialsScience } from "react-icons/gi";
import React from "react";
import { GameCardModel } from "../../../models/models";

interface Props {
  handleCollectionType: () => void;
  collectionType: boolean;
  collection: GameCardModel[];
}

interface RarityCount {
  [key: string]: number;
}

export interface IIndexable<T = any> {
  [key: string]: T;
}

const ButtonContainerSx = {
  display: "flex",
  padding: "5px",
};

const CardCollectionManager: React.FC<Props> = ({
  handleCollectionType,
  collectionType,
  collection,
}: Props) => {
  const sortedCollection: RarityCount = collection.reduce(
    (acc: IIndexable, current: GameCardModel) => {
      let currentType = "";
      switch (current.rarity) {
        case 1:
          currentType = "royal";
          break;
        case 2:
          currentType = "noble";
          break;
        case 3:
          currentType = "artisan";
          break;
        case 4:
          currentType = "peasant";
          break;
        default:
          break;
      }
      const rarityCount: RarityCount = { ...acc };
      rarityCount[currentType] += 1;
      return rarityCount;
    },
    {
      royal: 0,
      noble: 0,
      artisan: 0,
      peasant: 0,
    }
  );

  return (
    <Container
      disableGutters
      sx={{
        position: "absolute",
        height: "100%",
        width: "150px",
        backgroundColor: "#7C6C9E",
      }}
    >
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <MenuIcon sx={{ backgroundColor: "pink", fontSize: "40px" }} />
        </IconButton>
        <Typography fontSize="30px"> All Cards: {collection.length}</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px">{sortedCollection.royal}</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> {sortedCollection.noble}</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> {sortedCollection.artisan}</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> {sortedCollection.peasant}</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <Button onClick={handleCollectionType} sx={{ color: "pink" }}>
          {collectionType ? "Show All Cards" : "Show my collection"}
        </Button>
      </Container>
    </Container>
  );
};

export default CardCollectionManager;
