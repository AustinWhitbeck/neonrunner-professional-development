import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Modal,
} from "@mui/material";
import React from "react";
import { RarityFilter } from "../../../models/models";

interface Props {
  filterValues: RarityFilter;
  toggleFiltersModal: () => void;
  filtersModalOpen: boolean;
  handleModalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFiltersSubmit: () => void;
  handleGetAllCards: () => void;
}

const RarityFiltersForm: React.FC<Props> = ({
  filterValues,
  toggleFiltersModal,
  filtersModalOpen,
  handleModalChange,
  handleFiltersSubmit,
  handleGetAllCards,
}: Props) => {
  const { royal, noble, artisan, peasant } = filterValues;

  return (
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
                  onChange={handleModalChange}
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
                  onChange={handleModalChange}
                  name="noble"
                />
              }
              label="Noble"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={artisan}
                  onChange={handleModalChange}
                  name="artisan"
                />
              }
              label="Artisan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={peasant}
                  onChange={handleModalChange}
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
  );
};

export default RarityFiltersForm;
