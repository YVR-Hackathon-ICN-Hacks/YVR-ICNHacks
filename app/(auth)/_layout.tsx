import React, { useLayoutEffect } from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Back" }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="details" options={{ presentation: "modal" }} />
      <Stack.Screen name="pages" options={{ presentation: "card" }} />
    </Stack>
  );
};

export default AuthLayout;
