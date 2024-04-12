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
      headerTitle: "YVR Air Guard",
    });
  }, [navigation]);

  const route =
    useRoute<RouteProp<{ params: NavigationParamList }, "params">>();
  const detail_id = route.params.detail_id;

  return (
    <View style={styles.container}>
      <Text style={{ color: "black", fontSize: 18, marginBottom: 10 }}>
        YVR Hackathon 2024
      </Text>
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
      <Text style={{ color: "black", fontSize: 18 }}>
        Challenge 3: Efficient and Healthy Building
      </Text>
      <View style={styles.separator} />
      <Text
        style={{
          color: "black",
          fontSize: 18,
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        Product MVP
      </Text>
      <View style={styles.mvpContainer}>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black" }}>MVP 1</Text> :
          Retrieve data from a CSV file and visualize it with graphs.
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black" }}>MVP 2</Text>:
          Implement push notifications for abnormal data to facilitate rapid
          detection and response.
        </Text>
      </View>
      <View style={styles.separator} />
      <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
        Team Members
      </Text>
      <View style={styles.memberContainer}>
        <View style={styles.memberColumn}>
          <Text style={styles.memberText}>Jasper Oh - Full Stack</Text>
          <Text style={styles.memberText}>David Cho - Frontend</Text>
          <Text style={styles.memberText}>Alex Chung - Frontend</Text>
        </View>
        <View style={styles.columnSeparator}></View>
        <View style={styles.memberColumn}>
          <Text style={styles.memberText}>Jeen Namkung - Backend</Text>
          <Text style={styles.memberText}>Eunjeong Hur - Frontend</Text>
          <Text style={styles.memberText}>Tim Lee - Frontend</Text>
        </View>
      </View>
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
  memberContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#c6d8e7",
    padding: 20,
  },
  columnSeparator: {
    flexDirection: "column",
    width: 30,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  memberColumn: {
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10, // 버튼 간의 간격 조절
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  memberText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "left",
    color: "black",
  },
  mvpContainer: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
});
