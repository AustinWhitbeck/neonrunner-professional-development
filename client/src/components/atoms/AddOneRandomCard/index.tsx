import { Button } from "@mui/material";
import React from "react";
import { User } from "../../../models/models";
import { addOneRandomCardToUserCollection } from "../../../repository";

interface Props {
  currentUser: User;
}

const AddOneRandomCard: React.FC<Props> = ({ currentUser }: Props) => {
  return (
    <Button
      onClick={(): Promise<void> =>
        addOneRandomCardToUserCollection(currentUser.user_id as number)
      }
    >
      Add 1 Card
    </Button>
  );
};

export default AddOneRandomCard;
