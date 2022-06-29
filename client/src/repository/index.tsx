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

// Promise<User[]>

export const getAllUsers = async (): Promise<User[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<User[]>(
      "http://localhost:3001/all-users"
    );

    // 👇️ "response status is: 200"
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
