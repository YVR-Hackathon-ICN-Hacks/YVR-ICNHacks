import { Button, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigation = useNavigation();

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
      navigation.isFocused("(auth)");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.viewBox}>
        <Text style={styles.title}>Log-in</Text>
        <View lightColor="#FFFFFF" darkColor="#101010" style={{ padding: 10 }}>
          <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        </View>
        <Button title="Login with Google" onPress={() => promptAsync()} />
        <Button
          title="Clear Local Storage"
          onPress={() => AsyncStorage.removeItem("@user")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  viewBox: {
    width: "80%",
    padding: 20,
    alignItems: "center",
    paddingTop: 100,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
