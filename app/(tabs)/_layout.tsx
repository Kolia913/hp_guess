import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import ResetButton from "@/components/ResetButton";
import { StatusBar } from "expo-status-bar";

function TabsLayout() {
  return (
    <>
      <Tabs
        initialRouteName={"index"}
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#6e6e6e",
          headerStyle: {
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            height: 100,
          },
          tabBarStyle: {
            borderTopColor: "#000",
            borderTopWidth: 1,
            height: 80,
          },
          headerRight: (props) => <ResetButton {...props} />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            headerTitle: "Home Screen",
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="list" size={24} color={color} />
            ),
            headerTitle: "List Screen",
            title: "List",
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}

export default TabsLayout;
