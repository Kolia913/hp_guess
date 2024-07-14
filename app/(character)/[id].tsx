import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCharactersStore } from "@/states/characters";
import { GuesssedCharacterProfile } from "@/types/guessed";
import Toast from "react-native-toast-message";
import CharacterProfile from "@/components/profile/CharacterProfile";
import AppButton from "@/components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";

const CharacterInfo = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState<GuesssedCharacterProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGuessedCharacter = useCharactersStore(
    (store) => store.getGuessedCharacter
  );

  useEffect(() => {
    const getCharacterProfile = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const res = await getGuessedCharacter(id as string);
          setCharacter(res);
        } else {
          throw Error("Invalid character id");
        }
      } catch (error) {
        setCharacter(null);
        Toast.show({
          type: "error",
          text1: "Oops... An error occured",
          text2: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getCharacterProfile();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: character?.profile.name || "Profile",
    });
  }, [character]);

  const goHomePage = () => {
    router.replace("/");
  };
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="h-full bg-white border-t border-t-black"
    >
      <ScrollView
        className="py-6 px-4"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          gap: 16,
          paddingBottom: 60,
        }}
      >
        {!isLoading ? (
          <>
            {character ? (
              <CharacterProfile character={character} />
            ) : (
              <View className="flex justify-center items-center gap-y-4 pt-10">
                <Text className="text-gray-500 text-2xl">
                  Oops... An error occured
                </Text>
                <AppButton onPress={goHomePage} text="Go Home" />
              </View>
            )}
          </>
        ) : (
          <View className="h-full w-full justify-center items-center">
            <ActivityIndicator animating={isLoading} color="black" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CharacterInfo;
