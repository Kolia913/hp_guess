import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface AppButtonProps {
  onPress: () => void;
  text: string;
}

const AppButton = ({ onPress, text }: AppButtonProps) => {
  return (
    <TouchableOpacity
      className="px-3 py-3 bg-black"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text className="text-white font-semibold">{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
