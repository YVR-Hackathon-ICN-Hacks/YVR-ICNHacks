import { StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";

const screenWidth = Dimensions.get("window").width - 16;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [5, 5.5, 6, 5, 5.5, 6, 7],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#fafafa",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#eceff1",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(245, 22, 70, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 12,
  },
  barPercentage: 0.8,
};

export default function BarChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Average Sunlight Exposure</Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix="°C"
        showValuesOnTopOfBars={true}
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
