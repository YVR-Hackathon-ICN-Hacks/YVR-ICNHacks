import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { NavigationParamList } from "@/types/types";

export default function Pages() {
  const route =
    useRoute<RouteProp<{ params: NavigationParamList }, "params">>();
  const context = route.params.context;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <StatusBar style="dark" />
      <Text style={styles.title}>{context}</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
