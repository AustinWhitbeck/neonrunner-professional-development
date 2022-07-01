import { Container } from "@mui/system";
import React, { Dispatch, SetStateAction } from "react";
import { User } from "../../../models/models";
import NewUserForm from "../../molecules/NewUserForm";

interface Props {
  currentUser: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const Login: React.FC<Props> = ({ currentUser, setUser }: Props) => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}
    >
      <NewUserForm props={{ currentUser, setUser }} />
    </Container>
  );
};

export default Login;
