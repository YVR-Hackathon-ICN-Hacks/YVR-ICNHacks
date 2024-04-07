import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, View } from '@/components/Themed';

const screenWidth = Dimensions.get('window').width - 16;


const data1 = {
  labels: ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
  datasets: [
    {
      data: [70, 68, 67, 69, 72, 74, 73, 71],
      label: 'Temperature',
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
    }
  ],
  legend: ["Temperature"]
};
const data2 = {
  labels: ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
  datasets: [
    {
      data: [55, 60, 57, 54, 50, 52, 56, 58],
      color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
    }
  ],
  legend: ["Humidity"]
};

const chartConfig = {
    backgroundColor: "#fafafa",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#eceff1",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 121, 191, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 12,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
    }
}

export default function LineChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Temperature and Humidity Over Time</Text>
      <LineChart
        data={data1}
        width={screenWidth}
        height={200}
        yAxisSuffix="°F"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 12,
        }}
        withShadow={false}
      />
      <LineChart
        data={data2}
        width={screenWidth}
        height={200}
        yAxisSuffix="%"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 12,
        }}
        withShadow={false}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
});