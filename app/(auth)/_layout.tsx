import React from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: styles.content }}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E5F7FF",
  },
});

export default Layout;
