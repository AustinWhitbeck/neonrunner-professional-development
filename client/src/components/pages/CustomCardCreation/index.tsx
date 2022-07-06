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

interface CustomCardForm {
  name: string;
  attack: number;
  defense: number;
  flavor_text: string;
  rarity: number;
}

const CustomCardCreation: React.FC = () => {
  const [formValues, setFormValues] = useState<CustomCardForm>({
    name: "",
    attack: 0,
    defense: 0,
    flavor_text: "",
    rarity: 1,
  });

  const { name, attack, defense, flavor_text, rarity } = formValues;

  const inputSx = {
    margin: "0 15px 15px 0",
  };

  const handleSubmit = (): void => {
    addNewCustomCard({ name, attack, defense, flavor_text, rarity });
    setFormValues({
      name: "",
      attack: 0,
      defense: 0,
      flavor_text: "",
      rarity: 1,
    });
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
              const newValues = { ...formValues };
              newValues.name = e.target.value;
              setFormValues(newValues);
            }}
            sx={inputSx}
          />
          <TextField
            label="Flavor"
            value={flavor_text}
            onChange={(e): void => {
              const newValues = { ...formValues };
              newValues.flavor_text = e.target.value;
              setFormValues(newValues);
            }}
            sx={inputSx}
          />
          <TextField
            type="number"
            label="Attack"
            value={attack}
            onChange={(e): void => {
              const newValues = { ...formValues };
              newValues.attack = parseInt(e.target.value);
              setFormValues(newValues);
            }}
            sx={inputSx}
          />
          <TextField
            type="number"
            label="Defense"
            value={defense}
            onChange={(e): void => {
              const newValues = { ...formValues };
              newValues.defense = parseInt(e.target.value);
              setFormValues(newValues);
            }}
            sx={inputSx}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Rarity</InputLabel>
            <Select
              fullWidth
              value={rarity.toString()}
              defaultValue="royal"
              label="Rarity"
              onChange={(e): void => {
                const newValues = { ...formValues };
                newValues.rarity = parseInt(e.target.value);
                setFormValues(newValues);
              }}
            >
              <MenuItem value={1}>Royal</MenuItem>
              <MenuItem value={2}>Noble</MenuItem>
              <MenuItem value={3}>Artisan</MenuItem>
              <MenuItem value={4}>Peasant</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Container
          disableGutters
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <GameCard card={{ name, attack, defense, flavor_text, rarity }} />
        </Container>
      </Container>
      <Button size="large" onClick={handleSubmit}>
        Submit New Card
      </Button>
    </div>
  );
};

export default CustomCardCreation;
