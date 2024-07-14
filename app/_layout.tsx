import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useCharactersStore } from "@/states/characters";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const fetchAllCharacters = useCharactersStore(
    (store) => store.fetchAllCharacters
  );
  useEffect(() => {
    fetchAllCharacters().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </>
  );
}
export default RootLayout;
