import axios from "axios";
import { User } from "../models/models";

export const addNewUser = (user: User): void => {
  // two arguments: path and body
  axios
    .post("http://localhost:3001/create-user", {
      name: user.name,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
    })
    .then(() => {
      console.log("successful posting of new user");
    });
};

export const getAllUsers = (): User[] => {
  // two arguments: path and body
  axios.get("http://localhost:3001/").then((result) => {
    console.log("successful getting all users,", result);
    return result.data;
  });
};
