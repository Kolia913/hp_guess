import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchInput = ({
  placeholder,
  onSearch,
  initialValue = "",
}: SearchInputProps) => {
  const [value, setValue] = useState<string>(initialValue || "");

  return (
    <View className="border-2 border-black w-full h-16 px-4 items-center flex-row ">
      <TextInput
        className="flex-1 text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#000"}
        onChangeText={(e) => setValue(e)}
      />
      <TouchableOpacity
        onPress={() => onSearch(value.trim())}
        activeOpacity={0.8}
      >
        <FontAwesome name="search" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
