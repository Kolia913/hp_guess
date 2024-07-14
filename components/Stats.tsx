import { View, Text } from "react-native";
import React from "react";
import { useStatsStore } from "@/states/stats";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideOutDown,
} from "react-native-reanimated";

const Stats = () => {
  const [total, success, failed] = useStatsStore((state) => [
    state.total,
    state.success,
    state.failed,
  ]);
  return (
    <View className="justify-between items-center flex-row w-full">
      <Animated.View
        entering={FadeInUp.delay(500).springify()}
        className="bg-gray-200 border-2 border-solid border-black justify-center items-center w-28 h-24"
      >
        <Text className="text-3xl">{total}</Text>
        <Text className="text-sm font-light">Total</Text>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(600).springify()}
        className="bg-gray-200 border-2 border-solid border-black justify-center items-center w-28 h-24"
      >
        <Text className="text-3xl">{success}</Text>
        <Text className="text-sm font-light">Success</Text>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(700).springify()}
        className="bg-gray-200 border-2 border-solid border-black justify-center items-center w-28 h-24"
      >
        <Text className="text-3xl">{failed}</Text>
        <Text className="text-sm font-light">Failed</Text>
      </Animated.View>
    </View>
  );
};

export default Stats;
