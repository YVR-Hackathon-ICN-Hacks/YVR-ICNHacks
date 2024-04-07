import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
};

export default PublicLayout;
