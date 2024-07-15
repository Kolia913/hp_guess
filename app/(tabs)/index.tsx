import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, Text, Image } from "react-native";
import { useCharactersStore } from "@/states/characters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character } from "@/types/character";
import Stats from "@/components/Stats";
import Houses from "@/components/home/Houses";
import CharacterVariant from "@/components/home/CharacterVariant";
import { House } from "@/types/houses";
import Toast from "react-native-toast-message";
import { useStatsStore } from "@/states/stats";

function Index() {
  const pickRandomCharacter = useCharactersStore(
    (store) => store.pickRandomCharacter
  );
  const addGuessed = useCharactersStore((store) => store.addGuessed);
  const character = useCharactersStore((state) => state.character);
  const isError = useCharactersStore((state) => state.isError);

  const guess = useStatsStore((store) => store.guess);
  const fail = useStatsStore((store) => store.fail);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const pickCharacter = useCallback(() => {
    setIsRefreshing(true);
    pickRandomCharacter();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (!character && !isError) {
      pickRandomCharacter();
    }
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Failed to fetch character",
      });
    }
  }, [pickCharacter, character]);

  const addCharacterToGuessList = ({ isGuessed }: { isGuessed: boolean }) => {
    if (character) {
      addGuessed({
        id: character.id,
        image: character.image,
        name: character.name,
        isGuessed,
      });
    }
  };

  const guessCharactersHouse = () => {
    Toast.show({
      type: "success",
      text1: "Congrats!",
    });
    guess();
    addCharacterToGuessList({ isGuessed: true });
  };

  const failCharactersHouse = () => {
    Toast.show({
      type: "error",
      text1: "Failed!",
    });
    fail();
    addCharacterToGuessList({ isGuessed: false });
  };

  const tryGuessHouse = (house: House) => {
    if (!character) {
      return;
    }
    if (character?.house === house) {
      guessCharactersHouse();
    } else {
      failCharactersHouse();
    }
    pickCharacter();
  };

  return (
    <SafeAreaView edges={["left", "right"]}>
      <ScrollView
        className="bg-white px-4 h-full py-6"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          gap: 16,
          paddingBottom: 60,
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={pickCharacter} />
        }
      >
        <Stats />
        {character ? (
          <CharacterVariant name={character.name} image={character.image} />
        ) : (
          <View className="h-20 flex items-center justify-center">
            <Text className="text-xl text-red-400">
              Failed to pick character,
            </Text>
            <Text className="text-xl text-red-400">
              please try again or reopen app :(
            </Text>
          </View>
        )}
        <Houses onHouseClick={tryGuessHouse} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
