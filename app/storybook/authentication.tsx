import { Button, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { Text, View } from "@/components/Themed";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function Authentication() {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Authentication",
    });
  }, [navigation]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    handleGoogleSignIn();
  }, [response]);

  async function handleGoogleSignIn() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken ?? "");
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View lightColor="#FFFFFF" darkColor="#101010" style={styles.container}>
      <Text style={styles.title}>Authentication</Text>
      <View lightColor="#FFFFFF" darkColor="#101010" style={{ padding: 10 }}>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      </View>
      <Button title="Login with Google" onPress={() => promptAsync()} />
      <Button
        title="Clear Local Storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
