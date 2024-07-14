import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface ResetButtonProps {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
}

const BackButton = (props: ResetButtonProps) => {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <TouchableOpacity
      className="ml-8 flex-row justify-start items-start gap-x-1"
      onPress={goBack}
      activeOpacity={props?.pressOpacity || 0.7}
    >
      <FontAwesome name="angle-left" size={16} color="black" />
      <Text className="text-black">Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
