import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { addNewCustomCard } from "../../../repository";
import GameCard from "../../molecules/GameCard";

const CustomCardCreation: React.FC = () => {
  const [name, setName] = useState<string>("Card Name");
  const [attack, setAttack] = useState<number>(1);
  const [defense, setDefense] = useState<number>(1);
  const [flavor, setFlavor] = useState<string>("Flavor Text");
  const [rarity, setRarity] = useState<string>("Peasant");

  const inputSx = {
    margin: "0 15px 15px 0",
  };

  const handleSubmit = (): void => {
    addNewCustomCard({ name, attack, defense, flavor_text: flavor, rarity });
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "40px" }}
      >
        Custom Card Creation
      </Typography>
      <Container sx={{ display: "flex" }}>
        <Box component="form">
          <TextField
            label="Name"
            value={name}
            onChange={(e): void => {
              setName(e.target.value);
            }}
            sx={inputSx}
          />
          <TextField
            label="Flavor"
            value={flavor}
            onChange={(e): void => {
              setFlavor(e.target.value);
            }}
            sx={inputSx}
          />
          <TextField
            type="number"
            label="Attack"
            value={attack}
            onChange={(e): void => {
              setAttack(parseInt(e.target.value));
            }}
            sx={inputSx}
          />
          <TextField
            type="number"
            label="Defense"
            value={defense}
            onChange={(e): void => {
              setDefense(parseInt(e.target.value));
            }}
            sx={inputSx}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Rarity</InputLabel>
            <Select
              fullWidth
              value={rarity}
              defaultValue="royal"
              label="Rarity"
              onChange={(e): void => {
                setRarity(e.target.value);
              }}
            >
              <MenuItem value="royal">Royal</MenuItem>
              <MenuItem value="noble">Noble</MenuItem>
              <MenuItem value="artisan">Artisan</MenuItem>
              <MenuItem value="peasant">Peasant</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Container
          disableGutters
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <GameCard
            card={{ name, attack, defense, flavor_text: flavor, rarity }}
          />
        </Container>
      </Container>
      <Button size="large" onClick={handleSubmit}>
        Submit New Card
      </Button>
    </div>
  );
};

export default CustomCardCreation;
