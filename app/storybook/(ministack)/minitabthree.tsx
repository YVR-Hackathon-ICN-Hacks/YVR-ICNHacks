import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export default function MiniTabThree() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mni Tab Three</Text>
      <View style={styles.separator} />
      <Text>Swipe Left or Right</Text>
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
