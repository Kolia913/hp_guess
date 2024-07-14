import AppButton from "@/components/AppButton";
import CharacterItem from "@/components/list/CharacterItem";
import SearchInput from "@/components/list/SearchInput";
import Stats from "@/components/Stats";
import { useCharactersStore } from "@/states/characters";
import { GuesssedCharacter } from "@/types/guessed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

function List() {
  const guessedList = useCharactersStore((state) => state.guessedList);
  const [localList, setLocalList] = useState<GuesssedCharacter[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [prevQuery, setPrevQuery] = useState<string>("");

  useEffect(() => {
    setLocalList(guessedList);
  }, [guessedList]);

  const refresh = () => {
    setIsRefreshing(true);
    setLocalList(guessedList);
    setPrevQuery("");
    setIsRefreshing(false);
  };

  const filterList = (query: string) => {
    setPrevQuery(query);
    if (query.length < 1) {
      setLocalList(guessedList);
      return;
    }
    setLocalList((prevState) => {
      if (prevState !== null) {
        const sortedList = prevState.filter((item) =>
          item.name.includes(query)
        );
        return sortedList;
      } else {
        return null;
      }
    });
  };

  const goHomePage = () => {
    router.push("/");
  };

  return (
    <FlatList
      data={localList}
      className="px-4 py-6 bg-white h-full"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        gap: 24,
        paddingBottom: 60,
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      renderItem={({ item }) => <CharacterItem character={item} />}
      keyExtractor={(item: GuesssedCharacter) => item.id}
      ListEmptyComponent={() => (
        <View className="flex justify-center items-center gap-y-4 pt-10">
          <Text className="text-gray-500 text-2xl">
            No guessed characters yet :(
          </Text>
          <AppButton onPress={goHomePage} text="Guess now!" />
        </View>
      )}
      ListHeaderComponent={() => (
        <View className="flex flex-col justify-start items-center pb-4">
          <Stats />
          <View className="pt-4">
            <SearchInput
              placeholder="Filter characters..."
              onSearch={filterList}
              initialValue={prevQuery}
            />
          </View>
        </View>
      )}
    />
  );
}

export default List;
