import { View, Text, Image } from "react-native";
import React from "react";
import { GuesssedCharacterProfile } from "@/types/guessed";
import { images } from "@/constants/images";

interface CharacterProfileProps {
  character: GuesssedCharacterProfile;
}

const CharacterProfile = ({ character }: CharacterProfileProps) => {
  return (
    <View className="flex-row justify-start items-start gap-x-6">
      {character.profile.image.length > 0 ? (
        <Image
          className="w-48 h-64"
          source={{
            uri: character.profile.image,
          }}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={images.Thumbnail}
          className="w-48 h-64"
          resizeMode="cover"
        />
      )}
      {character.hasAccess ? (
        <View className="flex-col justify-start items-start gap-y-2 flex-wrap">
          <View>
            <Text>House:</Text>
            <Text className="max-w-[150px]">
              {character.profile.house || "Not in House"}
            </Text>
          </View>
          <View>
            <Text>Date of birth:</Text>
            <Text className="max-w-[150px]">
              {character.profile.dateOfBirth || "-"}
            </Text>
          </View>
          <View>
            <Text>Actor:</Text>
            <Text className="max-w-[150px]">
              {character.profile.actor || "-"}
            </Text>
          </View>
          <View>
            <Text>Species:</Text>
            <Text className="max-w-[150px]">
              {character.profile.species || "-"}
            </Text>
          </View>
        </View>
      ) : (
        <View className="px-4 py-2 border-2 border-red-600 justify-center items-center">
          <Text className="text-xl font-semibold text-red-600 max-w-[100px]">
            Access Denied
          </Text>
        </View>
      )}
    </View>
  );
};

export default CharacterProfile;
