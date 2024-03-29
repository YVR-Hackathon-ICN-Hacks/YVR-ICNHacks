import { Button, StyleSheet } from "react-native";
import * as React from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  const [userInfo, setUserInfo] = React.useState(null);
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
        console.log("success!!");
        await getUserInfo(response.authentication?.accessToken ?? "");
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string) => {
    console.log("TOKEN", token);
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("!!!!", response);
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One Text</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ padding: 10 }}>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      </View>
      <Button title="Login with Google" onPress={() => promptAsync()} />
      <Button
        title="Clear Local Storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
