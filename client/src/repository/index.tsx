import axios from "axios";
import { GameCardModel, User } from "../models/models";

// ** GET REQUESTS ** //

export const getAllCards = async (): Promise<GameCardModel[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GameCardModel[]>(
      "http://localhost:3001/all-cards"
    );

    // 👇️ "response status is: 200"
    console.log("status of getAllCards", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getUserCardCollection = async (
  user_id: number
): Promise<GameCardModel[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GameCardModel[]>(
      `http://localhost:3001/user_collection/${user_id}`
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

export const getAllUsers = async (): Promise<User[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<User[]>(
      "http://localhost:3001/all-users"
    );

    // 👇️ "response status is: 200"

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};

// ** POST REQUESTS ** //

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

export const addNewCustomCard = (card: GameCardModel): void => {
  // two arguments: path and body

  axios
    .post("http://localhost:3001/custom-card", {
      name: card.name,
      attack: card.attack,
      defense: card.defense,
      flavor_text: card.flavor_text,
      rarity: card.rarity,
    })
    .then(() => {
      console.log("successful posting of new custom card!");
    });
};
