import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

const CharacterLayout = () => {
  return (
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
  );
};

export default CharacterLayout;
