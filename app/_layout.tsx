import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Login from "./login";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState<string | null>(null);
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

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      setUserAuth(user);
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <RootLayoutNav userAuth={userAuth} />;  
}

function RootLayoutNav({ userAuth }: { userAuth: string | null }) {
  // console.log(userAuth)
  return (    
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />               
        {userAuth === null ? (          
          <Login/>
        ) : (
          <Stack screenOptions={{ headerShown: true }}>    
            <Stack.Screen name="(auth)" options={{ title: "Home" }} />
          </Stack>
        )}
        
      </ThemeProvider>    
  );
}
