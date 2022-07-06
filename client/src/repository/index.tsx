import axios from "axios";
import { GameCardModel, User } from "../models/models";

interface BoolKey {
  [key: string]: boolean;
}

//// ** GET REQUESTS ** ////

// USER SPECIFIC GETS

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

export const getUserCardCollectionSearchMatch = async (
  user_id: number,
  text: string
): Promise<GameCardModel[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GameCardModel[]>(
      `http://localhost:3001/user_collection/search-name/${user_id}/${text}`
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

// ALL GETS

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

export const getAllCardsSearchMatch = async (
  text: string
): Promise<GameCardModel[] | string> => {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GameCardModel[]>(
      `http://localhost:3001/all-cards/search-name/${text}`
    );

    // 👇️ "response status is: 200"
    console.log(`response status is: ${status}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getAllCardsWithFilters = async (
  filters: BoolKey
): Promise<GameCardModel[] | string> => {
  try {
    console.log("filters value", filters);
    const rarityValuesArray: number[] = [];
    Object.keys(filters).forEach((filter) => {
      console.log("filters in forEach", filters[filter]);
      if (filters[filter]) {
        let numRarity = 0;
        switch (filter) {
          case "royal":
            numRarity = 1;
            break;
          case "noble":
            numRarity = 2;
            break;
          case "artisan":
            numRarity = 3;
            break;
          case "peasant":
            numRarity = 4;
            break;
          default:
            break;
        }
        rarityValuesArray.push(numRarity);
        console.log("rarityValuesArray", rarityValuesArray);
      }
    });
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GameCardModel[]>(
      `http://localhost:3001/all-cards/${rarityValuesArray}`
    );

    // 👇️ "response status is: 200"
    console.log("status of getAllCardsWithFilters", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
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
    console.log(`response status is: ${status}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};

//// ** POST REQUESTS ** ////

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
