import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { StatusBar } from "expo-status-bar";

const CharacterLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerLeft: (props) => <BackButton {...props} />,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default CharacterLayout;
