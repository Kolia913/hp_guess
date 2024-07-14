import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

interface CharacterVariantProps {
  image: string;
  name: string;
}

const CharacterVariant = ({ image, name }: CharacterVariantProps) => {
  return (
    <View className="flex-col justify-start items-center ">
      {image.length > 0 ? (
        <Animated.Image
          entering={FadeInLeft.delay(400).springify()}
          className="w-48 h-64"
          source={{
            uri: image,
          }}
          resizeMode="cover"
        />
      ) : (
        <Animated.Image
          entering={FadeInLeft.delay(400).springify()}
          source={images.Thumbnail}
          className="w-48 h-64"
          resizeMode="cover"
        />
      )}
      <Text className="text-xl font-semibold pt-4">{name}</Text>
    </View>
  );
};

export default CharacterVariant;
