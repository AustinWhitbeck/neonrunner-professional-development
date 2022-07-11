import { Button } from "@mui/material";
import React from "react";
import { User } from "../../../models/models";
import { addOneRandomCardToUserCollection } from "../../../repository";

interface Props {
  currentUser: User;
  handleGetUserCollection: () => Promise<void>;
}

const AddOneRandomCard: React.FC<Props> = ({
  currentUser,
  handleGetUserCollection,
}: Props) => {
  const handleAddOne = (): void => {
    addOneRandomCardToUserCollection(currentUser.user_id as number);
    handleGetUserCollection;
  };
  return <Button onClick={handleAddOne}>Add 1 Card</Button>;
};

export default AddOneRandomCard;
