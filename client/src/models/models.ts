export interface User {
  user_id: number | null;
  name: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface GameCardModel {
  card_id?: number;
  defense: number | string;
  flavor_text: string;
  name: string;
  attack: number | string;
  rarity: number;
}
