import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { NavigationParamList } from "@/types/types";

export default function Details() {
  const route =
    useRoute<RouteProp<{ params: NavigationParamList }, "params">>();
  const context = route.params.context;

  const detail_id = route.params.detail_id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail {detail_id}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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