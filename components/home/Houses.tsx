import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useCharactersStore } from "@/states/characters";
import { House } from "@/types/houses";

interface HousesProps {
  onHouseClick: (house: House) => void;
}

const Houses = ({ onHouseClick }: HousesProps) => {
  const houses = useCharactersStore((state) => state.houses);

  const selectHouse = (house: House) => {
    onHouseClick(house);
  };
  return (
    <View className="justify-center items-center w-full">
      <View className="flex-row flex-wrap tems-start gap-y-4">
        {houses
          .filter((item) => item.house !== House.NotInHouse)
          .map((item, index) => (
            <View
              className={`w-1/2 ${index % 2 === 0 ? "pr-2" : "pl-2"}`}
              key={item.house}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="py-4 px-8 bg-gray-200 border-2 border-solid border-black items-center w-full"
                onPress={() => selectHouse(item.house)}
              >
                {item?.image && (
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                )}
                {item?.title && <Text className="mt-0.5">{item.title}</Text>}
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity
          activeOpacity={0.8}
          className="py-7 px-8 bg-gray-200 border-2 border-solid border-black items-center w-full"
          onPress={() => selectHouse(House.NotInHouse)}
        >
          <Text className="text-xl font-semibold">Not in House</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Houses;
