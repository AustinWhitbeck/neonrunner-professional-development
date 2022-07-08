import React from "react";

import { Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import VideogameAssetOffIcon from "@mui/icons-material/VideogameAssetOff";
import { GameCardModel } from "../../../models/models";
import {
  Gi3DMeeple,
  GiCrenelCrown,
  GiAbbotMeeple,
  GiFlatHammer,
} from "react-icons/gi";

interface FullCard {
  card: GameCardModel;
}

const GameCard: React.FC<FullCard> = ({ card }: FullCard) => {
  const rarityColor = "#FF0099";
  const raritySize = "30px";
  let strRarity = <GiCrenelCrown />;
  switch (card.rarity) {
    case 1:
      strRarity = <GiCrenelCrown color={rarityColor} size={raritySize} />;
      break;
    case 2:
      strRarity = <GiAbbotMeeple color={rarityColor} size={raritySize} />;
      break;
    case 3:
      strRarity = <GiFlatHammer color={rarityColor} size={raritySize} />;
      break;
    case 4:
      strRarity = <Gi3DMeeple color={rarityColor} size={raritySize} />;
      break;
    default:
      break;
  }
  return (
    <Card
      sx={{
        width: "200px",
        minWidth: "200px",
        height: "280px",
        textAlign: "center",
        border: "solid purple 4px",
        backgroundColor: "lightblue",
        margin: "10px",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "purple", textAlign: "left", padding: "5px" }}
      >
        {card.name}
      </Typography>
      <Container sx={{ width: "180px", height: "80px" }}>
        <div>{card.attack}</div>
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
        <Typography variant="body2">{card.flavor_text}</Typography>
      </Container>
      <div>{strRarity}</div>
    </Card>
  );
};

export default GameCard;
