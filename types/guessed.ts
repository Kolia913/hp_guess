import { Character } from "./character";

export type GuesssedCharacter = {
  id: string;
  image: string;
  name: string;
  isGuessed: boolean;
  attempts?: number;
};

export type GuesssedCharacterProfile = {
  hasAccess: boolean;
  profile: Character;
};
