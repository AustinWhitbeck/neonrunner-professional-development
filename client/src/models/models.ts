export interface User {
  user_id?: number;
  name: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface GameCardModel {
  defense: number | string;
  flavorText: string;
  name: string;
  power: number | string;
  rarity: string;
}
