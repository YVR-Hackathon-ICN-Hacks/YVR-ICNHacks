import { StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";

const screenWidth = Dimensions.get("window").width - 16;

const energyConsumptionData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [300, 280, 250, 220, 210, 230, 240, 260, 250, 270, 290, 310],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#fafafa",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#eceff1",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(245, 22, 70, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 12,
  },
  barPercentage: 0.3,
};

export default function BarChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Energy Consumption Comparison</Text>
      <BarChart
        data={energyConsumptionData}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix="kWh"
        showValuesOnTopOfBars={true}
        verticalLabelRotation={-30}
        style={{
          marginVertical: 8,
          borderRadius: 12,
        }}
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
