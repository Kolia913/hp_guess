import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useCharactersStore } from "@/states/characters";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

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
      <StatusBar style="dark" />
    </>
  );
}
export default RootLayout;
