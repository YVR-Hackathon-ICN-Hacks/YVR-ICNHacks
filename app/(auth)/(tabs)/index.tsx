import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import ButtonComponent from "@/components/landingButton";

export default function Landing() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Heat/Insulation</Text>
        <Text style={styles.title}>Management Platform</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.itemStyle}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <ButtonComponent
            value="Thermal Data"
            iconName="info"
            information="inside Thermal Data"
          ></ButtonComponent>
          <ButtonComponent
            value="Sensor Locations"
            iconName="event"
            information="inside Sensor Locations"
          ></ButtonComponent>
        </View>
        <View style={styles.buttonRow}>
          <ButtonComponent
            value="HAVC performance"
            iconName="analytics"
            information="inside HAVC performance"
          ></ButtonComponent>
          <ButtonComponent
            value="Sunlight exposure"
            iconName="assignment"
            information="inside Sunlight exposure"
          ></ButtonComponent>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8cb0ce",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginTop: 20,
    marginBottom: 20,
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginBottom: 20,
  },
  itemStyle: {
    flex: 1,
    width: "90%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#5d8bb0",
    padding: 20,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
});
