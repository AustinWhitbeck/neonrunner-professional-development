export interface User {
  user_id?: number;
  name: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface GameCardModel {
  defense: number | string;
  flavor_text: string;
  name: string;
  attack: number | string;
  rarity: string;
}
