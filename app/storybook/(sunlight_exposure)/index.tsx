import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, View } from '@/components/Themed';

const screenWidth = Dimensions.get('window').width - 16;

const sunlightData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [2, 2.5, 3, 2, 2.5, 3, 4],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 3
    },
    {
      data: [5, 5.5, 6, 5, 5.5, 6, 7],
      color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      strokeWidth: 3
    },
    {
      data: [8, 8.5, 9, 8, 8.5, 9, 10],
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      strokeWidth: 3
    }
  ],
  legend: ["Min", "Avg", "Max"]
}

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
      <Text style={styles.header}>Sunlight Exposure Trends Throughout the Week</Text>
      <LineChart
        data={sunlightData}
        width={screenWidth}
        height={300}
        yAxisSuffix="°C"
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