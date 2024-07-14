import { houseImages } from "@/constants/houseImages";
import { Character } from "@/types/character";
import { House, HouseVariant } from "@/types/houses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import request, { AxiosError } from "axios";
import { BASE_API } from "@/constants/api";
import { GuesssedCharacter, GuesssedCharacterProfile } from "@/types/guessed";

type CharacterStoreState = {
  characters: Character[] | null;
  character: Character | null;
  guessedList: GuesssedCharacter[] | null;
  houses: HouseVariant[];
  isError: boolean;
};

type CharacterStoreActions = {
  fetchAllCharacters: () => Promise<void>;
  pickRandomCharacter: () => void;
  pickCharacterById: (id: string) => void;
  addGuessed: (character: GuesssedCharacter) => void;
  getGuessedCharacter: (id: string) => Promise<GuesssedCharacterProfile>;
  resetGuessed: () => void;
};

type CharacterStoreType = CharacterStoreState & CharacterStoreActions;

export const useCharactersStore = create<CharacterStoreType>()(
  persist(
    (set, get) => ({
      characters: null,
      guessedList: null,
      isError: false,
      character: null,
      houses: [
        {
          house: House.Gryffindor,
          image: houseImages.Gryffindor,
          title: "Gryffindor",
        },
        {
          house: House.Slytherin,
          image: houseImages.Slytherin,
          title: "Slytherin",
        },
        {
          house: House.Ravenclaw,
          image: houseImages.Ravenclaw,
          title: "Ravenclaw",
        },
        {
          house: House.Hufflepuff,
          image: houseImages.Hufflepuff,
          title: "Hufflepuff",
        },
        {
          house: House.NotInHouse,
          title: "Not in house",
        },
      ],
      fetchAllCharacters: async () => {
        try {
          set(() => ({
            characters: [],
          }));
          const response = await request.get<Character[]>(
            `${BASE_API}/characters`
          );
          set(() => ({
            characters: response.data,
          }));
        } catch (error: unknown) {
          if (request.isAxiosError(error)) {
            const err = error as AxiosError;
            throw new Error(err.message);
          } else {
            throw new Error("Error fetching characters!");
          }
        }
      },
      pickRandomCharacter: () => {
        set(() => ({
          isError: false,
        }));
        const characters = get().characters;
        if (!characters?.length) {
          set(() => ({
            isError: true,
          }));
          return null;
        }
        const charactersLength = characters?.length;
        const randomIndex = Math.floor(Math.random() * charactersLength) + 0;
        set(() => ({
          character: characters[randomIndex],
          isError: false,
        }));
      },
      pickCharacterById: (id) => {
        set(() => ({
          isError: false,
        }));
        const characters = get().characters;
        if (!characters?.length) {
          return null;
        }
        const character = characters.find((item) => item.id === id);
        if (character) {
          set(() => ({
            character: character,
            isError: false,
          }));
        } else {
          set(() => ({
            character: null,
            isError: true,
          }));
        }
      },
      addGuessed: (character) => {
        const guessedList = get().guessedList || [];
        const guessedCharacter = guessedList.find(
          (item) => item.id === character.id
        );
        if (guessedCharacter?.isGuessed) {
          return;
        }

        if (guessedCharacter) {
          const guessedIndex = guessedList.findIndex(
            (item) => item.id === guessedCharacter.id
          );
          guessedIndex >= 0 &&
            guessedList.splice(guessedIndex, 1, {
              ...character,
              attempts: guessedCharacter.attempts
                ? guessedCharacter.attempts + 1
                : 1,
            });
          set(() => ({
            guessedList: [...guessedList],
          }));
        } else {
          set(() => ({
            guessedList: [{ ...character, attempts: 1 }, ...guessedList],
          }));
        }
      },
      getGuessedCharacter: async (id) => {
        const inGuessedList = get().guessedList?.find((item) => item.id === id);
        if (!inGuessedList) {
          throw new Error("You have not seen this character yet");
        }
        try {
          const response = await request.get<[Character]>(
            `${BASE_API}/character/${id}`
          );
          return {
            profile: response.data[0],
            hasAccess: inGuessedList.isGuessed,
          };
        } catch (error) {
          if (request.isAxiosError(error)) {
            const err = error as AxiosError;
            throw new Error(err.message);
          } else {
            throw new Error("Error fetching character!");
          }
        }
      },
      resetGuessed: () => {
        set(() => ({
          guessedList: [],
        }));
      },
    }),
    {
      name: "charactersStore",
      partialize: (state) => ({
        characters: state.characters,
        guessedList: state.guessedList,
      }),
      storage: createJSONStorage<
        Omit<CharacterStoreState, "houses" | "character" | "isError">
      >(() => AsyncStorage),
    }
  )
);
