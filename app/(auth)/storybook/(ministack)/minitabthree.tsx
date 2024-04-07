import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function MiniTabThree() {
  return (
    <View style={styles.container} lightColor="#FFFFFF" darkColor="#101010">
      <Text style={styles.title}>Mni Tab Three</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
