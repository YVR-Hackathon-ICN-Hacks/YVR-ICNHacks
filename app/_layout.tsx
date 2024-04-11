import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

SystemUI.setBackgroundColorAsync("transparent");

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: "Back",
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              headerStyle: {
                backgroundColor: "#c6d8e7",
              },
            }}
          />
          <Stack.Screen
            name="details"
            options={{
              presentation: "modal",
              headerStyle: {
                backgroundColor: "#c6d8e7",
              },
            }}
          />
          <Stack.Screen
            name="pages"
            options={{
              presentation: "card",
              headerStyle: {
                backgroundColor: "#c6d8e7",
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
