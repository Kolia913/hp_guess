import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useStatsStore } from "@/states/stats";
import { useCharactersStore } from "@/states/characters";

interface ResetButtonProps {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
}

const ResetButton = (props: ResetButtonProps) => {
  const reset = useStatsStore((store) => store.reset);
  const resetGuessed = useCharactersStore((store) => store.resetGuessed);

  const resetAll = () => {
    reset();
    resetGuessed();
  };
  return (
    <TouchableOpacity
      className="mr-8 justify-center items-center"
      onPress={resetAll}
      activeOpacity={props?.pressOpacity || 0.7}
    >
      <Text className="text-black">Reset</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;
