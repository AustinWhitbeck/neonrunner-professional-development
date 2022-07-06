import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { GiSpyglass } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  handleSubmit: (text: string) => void;
  handleClear: () => void;
}

const SearchBar: React.FC<Props> = ({ handleSubmit, handleClear }: Props) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleClearSearch = (): void => {
    setSearchText("");
    handleClear();
  };
  return (
    <Box>
      <TextField
        type="text"
        label="Search"
        value={searchText}
        onChange={(e): void => setSearchText(e.target.value)}
      ></TextField>
      <IconButton
        onClick={handleClearSearch}
        sx={{ display: searchText !== "" ? "" : "none" }}
      >
        <AiOutlineClose />
      </IconButton>
      <IconButton onClick={(): void => handleSubmit(searchText)}>
        <GiSpyglass />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
