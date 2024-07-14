import { ImageSourcePropType } from "react-native";

export enum House {
  Gryffindor = "Gryffindor",
  Slytherin = "Slytherin",
  Hufflepuff = "Hufflepuff",
  Ravenclaw = "Ravenclaw",
  NotInHouse = "",
}

export type HouseVariant = {
  house: House;
  image?: ImageSourcePropType;
  title?: string;
};
