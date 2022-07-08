import { BoolKey } from "../models/models";

export const cardRaritySort = (filters: BoolKey): number[] => {
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

  return rarityValuesArray;
};
