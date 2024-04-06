import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, View } from '@/components/Themed';

function getRandomInt(min: number, max: number, num: number) {
  var random_ints = []
  for (let i = 0; i < num; i++) {
    random_ints.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return random_ints
}

const exampleDatasets = [
  {
    data: getRandomInt(18, 40, 9),
    color:() => 'blue'
  },
  {
    data: getRandomInt(18, 40, 9),
    color:() => 'red'
  },
]

export default function LineChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Line Chart Example</Text>
      <LineChart
        data={{
          labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          datasets: exampleDatasets,
          legend: ['Room1', 'Room2']
        }}
        width={Dimensions.get('window').width - 16}
        height={300}
        yAxisSuffix="°C"
        yAxisInterval={2}
        chartConfig={{
          backgroundColor: "#fafafa",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#eceff1",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 121, 191, ${opacity})`, // Deep sky blue for contrast
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 12
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#0288d1"
          }
        }}                                                     
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
    fontSize: 20,
    marginBottom: 10,
  },
});