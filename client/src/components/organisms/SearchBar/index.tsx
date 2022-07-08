import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { GiSpyglass } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  handleSubmit: (text: string) => void;
  handleClear: () => void;
  nameSearch: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({
  handleSubmit,
  handleClear,
  nameSearch,
  setSearchText,
}: Props) => {
  // const [searchText, setSearchText] = useState<string>("");

  const handleClearSearch = (): void => {
    setSearchText("");
    handleClear();
  };
  return (
    <Box>
      <TextField
        type="text"
        label="Search"
        value={nameSearch}
        onChange={(e): void => setSearchText(e.target.value)}
      ></TextField>
      <IconButton onClick={handleClearSearch}>
        <AiOutlineClose />
      </IconButton>
      <IconButton onClick={(): void => handleSubmit(nameSearch)}>
        <GiSpyglass />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
