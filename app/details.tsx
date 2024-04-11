import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NavigationParamList } from "@/types/types";

export default function Details() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "YVR Hackathon 2024",
    });
  }, [navigation]);

  const route =
    useRoute<RouteProp<{ params: NavigationParamList }, "params">>();
  const detail_id = route.params.detail_id;

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#5d8bb0",
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "500", color: "white", fontSize: 18 }}>
          Insightful Lens
        </Text>
        <Text style={styles.title}>
          Enhancing Infrastructure & Building Health
          {detail_id}
        </Text>
      </View>
      <View style={styles.separator} />
      <Text style={{ color: "black", fontSize: 16 }}>
        Challenge 3: Efficient and Healthy Building
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#c6d8e7",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
  },
  separator: {
    marginVertical: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    color: "black",
  },
});
