import React, { Dispatch, SetStateAction, useState } from "react";
import { User } from "../models/models";
import { getAllUsers } from "../repository";

interface UserContext {
  allUsers?: User[];
  handleGetAllUsers?: () => Promise<void>;
  currentUser?: User;
  setCurrentUser?: Dispatch<SetStateAction<User>>;
  children?: React.ReactNode;
}

export const userContext = React.createContext<UserContext>({} as UserContext);

const [allUsers, setAllUsers] = useState<User[]>([]);
const [currentUser, setCurrentUser] = useState<User>({
  username: "",
  password: "",
  name: "Guest",
  avatar: "",
});

const handleGetAllUsers = async (): Promise<void> => {
  console.log("in handleGetAllUsers");
  const fetchedUsers = await getAllUsers();
  console.log(
    "🚀 ~ file: index.tsx ~ line 31 ~ handleGetAllUsers ~ fetchedUsers",
    fetchedUsers
  );
  if (Array.isArray(fetchedUsers)) {
    setAllUsers(fetchedUsers);
  }
};

const UserContextProvider: React.FC<UserContext | null> = () => {
  return (
    <userContext.Provider
      value={{
        allUsers,
        handleGetAllUsers,
        currentUser,
        setCurrentUser,
      }}
    ></userContext.Provider>
  );
};

export default UserContextProvider;
