import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { NavigationParamList } from "@/types/types";

export default function Pages() {
  const route =
    useRoute<RouteProp<{ params: NavigationParamList }, "params">>();
  const context = route.params.context;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{context}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/pages.tsx" />
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
