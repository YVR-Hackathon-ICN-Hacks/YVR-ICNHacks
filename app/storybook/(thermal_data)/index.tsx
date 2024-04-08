import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import data from "../../../constants/data.json";
import allData from "../../../constants/allData.json";

export default function LineChartTab() {
  const entireData = allData.flatMap((locationData) =>
    Object.entries(locationData).flatMap(([location, readings]) =>
      readings.map((reading) => ({
        ...reading,
        Location: location,
      }))
    )
  );

  const entireUniqueDates = [
    ...new Set(entireData.map((item) => item.Timestamp.split(" ")[0])),
  ];
  const entireUniqueLocations = [
    ...new Set(entireData.map((item) => item.Location)),
  ];

  const [entireSelectedDate, setEntireSelectedDate] = useState(
    entireUniqueDates[0]
  );
  const [entireSelectedLocation, setEntireSelectedLocation] = useState(
    entireUniqueLocations[0]
  );

  const entireFilteredData = entireData.filter(
    (item) =>
      item.Timestamp.split(" ")[0] === entireSelectedDate &&
      item.Location === entireSelectedLocation
  );

  const entireHourlyData = entireFilteredData.filter((item) => {
    const date = new Date(item.Timestamp);
    return date.getMinutes() === 0 && date.getSeconds() === 0;
  });

  const entireLabels = entireHourlyData.map(
    (item) => item.Timestamp.split(" ")[1]
  );

  const entireRT_AV_TL_Data = entireHourlyData.map((item) => {
    const filteredKeys = Object.keys(item).filter((key) => key.includes("RT"));
    const values = filteredKeys.map((key) => item[key]); // Assuming only one RT_AV_TL per reading
    return values[0] || 0; // Default to 0 if not found
  });

  const entiredatasets = [
    {
      data: entireRT_AV_TL_Data,
      color: () => "blue",
      strokeWidth: 2,
    },
  ];

  const isHour = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.getMinutes() === 0 && date.getSeconds() === 0;
  };

  const uniqueDates = [
    ...new Set(data.map((item) => item.Timestamp.split(" ")[0])),
  ];

  const [selectedDate, setSelectedDate] = useState(uniqueDates[0]);

  const filteredByDate = data.filter(
    (item) => item.Timestamp.split(" ")[0] === selectedDate
  );

  const hourlyData = filteredByDate.filter((item) => isHour(item.Timestamp));

  const labels = hourlyData.map((item) => item.Timestamp.split(" ")[1]);

  const RT_AV_TL_Data = hourlyData.map((item) => {
    const filteredKeys = Object.keys(item).filter((key) => key.includes("RT"));
    const values = filteredKeys.map((key) => item[key]); // resolve types later
    return values;
  });

  const datasets = [
    {
      data: RT_AV_TL_Data,
      color: () => "blue",
      strokeWidth: 2,
    },
  ];

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "80%" }}>
        <Picker
          selectedValue={entireSelectedLocation}
          onValueChange={(itemValue) => setEntireSelectedLocation(itemValue)}
          itemStyle={{ fontSize: 18, height: 150 }}
        >
          {entireUniqueLocations.map((location) => (
            <Picker.Item label={location} value={location} key={location} />
          ))}
        </Picker>
        <Picker
          selectedValue={entireSelectedDate}
          onValueChange={(itemValue, itemIndex) =>
            setEntireSelectedDate(itemValue)
          }
          itemStyle={{ fontSize: 18, height: 150 }}
        >
          {entireUniqueDates.map((date) => (
            <Picker.Item label={date} value={date} key={date} />
          ))}
        </Picker>
      </View>
      <Text style={styles.header}>Temperature</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        <LineChart
          data={{
            labels: entireLabels,
            datasets: entiredatasets.map((dataset) => ({
              ...dataset,
              data: dataset.data.map((value) => Number(value)),
            })),
          }}
          width={2000}
          height={300}
          yAxisSuffix="°C"
          yAxisInterval={2}
          // format time on x-axis
          formatXLabel={(value) => {
            // Prepend a default date to the time string
            const datetime = `2000-03-22T${value}`;
            const date = new Date(datetime);
            return `${date.getHours()}:${date
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
          }}
          chartConfig={{
            backgroundColor: "#fafafa",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 121, 0, ${opacity})`, // Deep sky blue for contrast
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 30,
            },
            propsForDots: {
              r: "2",
              strokeWidth: "4",
              stroke: "#0288d1",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
          withShadow={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
});
