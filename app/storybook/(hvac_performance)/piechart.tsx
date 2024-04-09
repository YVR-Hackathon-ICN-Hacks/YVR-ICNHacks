import { StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";

const screenWidth = Dimensions.get("window").width - 16;

const hvacLoadDistributionData = [
  {
    name: "Heating",
    population: 40,
    color: "#F66D44",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Cooling",
    population: 30,
    color: "#E6F69D",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Ventilation",
    population: 20,
    color: "#64C2A6",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Dehumidification",
    population: 10,
    color: "#2D87BB",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundColor: "#fafafa",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#eceff1",
  color: (opacity = 1) => `rgba(245, 22, 70, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 12,
  },
};

export default function PieChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Distribution of HVAC Load</Text>
      <PieChart
        data={hvacLoadDistributionData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
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
