import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GuesssedCharacter } from "@/types/guessed";
import { images } from "@/constants/images";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useCharactersStore } from "@/states/characters";
import { router } from "expo-router";

interface CharacterItemProps {
  character: GuesssedCharacter;
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const pickCharacterById = useCharactersStore(
    (store) => store.pickCharacterById
  );

  const goToCharacterProfile = () => {
    router.push(`/(character)/${character.id}`);
  };

  const retryToGuessCharacter = () => {
    pickCharacterById(character.id);
    router.push("/");
  };

  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goToCharacterProfile}
        className="flex-row items-center justify-start gap-x-3"
      >
        {character.image.length > 0 ? (
          <Image
            className="w-10 h-14"
            source={{
              uri: character.image,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={images.Thumbnail}
            className="w-10 h-14"
            resizeMode="cover"
          />
        )}
        <View className="flex-col justify-start items-start gap-y-1">
          <Text className="text-lg font-semibold">{character.name}</Text>
          <Text>Attempts: {character.attempts}</Text>
        </View>
      </TouchableOpacity>
      <View>
        {character.isGuessed ? (
          <AntDesign name="checkcircle" size={36} color="green" />
        ) : (
          <View className="flex-row justify-end items-center gap-x-3">
            <TouchableOpacity onPress={retryToGuessCharacter}>
              <Feather name="refresh-ccw" size={36} color="black" />
            </TouchableOpacity>
            <AntDesign name="closecircle" size={36} color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

export default CharacterItem;
