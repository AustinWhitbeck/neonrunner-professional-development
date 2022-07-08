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

export interface RarityFilter {
  royal: boolean;
  noble: boolean;
  artisan: boolean;
  peasant: boolean;
}

export interface BoolKey {
  [key: string]: boolean;
}

export interface FormattedFilters {
  rarityValues: number[];
  nameSearch?: string;
  id?: number;
}
