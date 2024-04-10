import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import data from "../../constants/data.json";
import allData from "../../constants/allData.json";
import { Reading } from "@/types/types";
import { Dropdown } from 'react-native-element-dropdown';

export default function LineChartTab() {
  const entireData = allData.flatMap((locationData) =>
    Object.entries(locationData).flatMap(([location, readings]) =>
      readings.map((reading: Reading) => ({
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

  const entireCO2_TL_Data = entireHourlyData.map((item) => {
    const filteredKeys = Object.keys(item).filter((key) => key.includes("CO2"));
    const values = filteredKeys.map((key) => item[key]); // Assuming only one CO2_TL per reading
    return values[0] || 0; // Default to 0 if not found
  });

  const entireFLW_AV_TL_Data = entireHourlyData.map((item) => {
    const filteredKeys = Object.keys(item).filter((key) => key.includes("FLW"));
    const values = filteredKeys.map((key) => item[key]); // Assuming only one CO2_TL per reading
    return values[0] || 0; // Default to 0 if not found
  });

  const entireRT_AV_TL_datasets = [
    {
      data: entireRT_AV_TL_Data,
      color: () => "blue",
      strokeWidth: 2,
    },
  ];

  const entireCO2_TL_datasets = [
    {
      data: entireCO2_TL_Data,
      color: () => "#fe8286",
      strokeWidth: 2,
    },
  ];

  const entireFLW_AV_TL_datasets = [
    {
      data: entireFLW_AV_TL_Data,
      color: () => "#ffa5f0",
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

  const renderDotRT_AV_TL_Content = ({ x, y, index }: { x: number, y: number, index: number }) => {
    const yValue = entireRT_AV_TL_Data[index].toFixed(1);
    return (
      <Text
        key={index}
        style={{ position: "absolute", paddingTop: y - 25, paddingLeft: x, color: "grey" }}
      >
        {yValue}°C
      </Text>
    );
  }

  const renderDotCO2_TL_Content = ({ x, y, index }: { x: number, y: number, index: number }) => {
    const yValue = entireCO2_TL_Data[index].toFixed(1);
    return (
      <Text
        key={index}
        style={{ position: "absolute", paddingTop: y - 25, paddingLeft: x, color: "grey" }}
      >
        {yValue}
      </Text>
    );
  }

  const renderDotFLW_AV_TL_Content = ({ x, y, index }: { x: number, y: number, index: number }) => {
    const yValue = entireFLW_AV_TL_Data[index].toFixed(1);
    return (
      <Text
        key={index}
        style={{ position: "absolute", paddingTop: y - 25, paddingLeft: x, color: "grey" }}
      >
        {yValue}
      </Text>
    );
  }

  const locationData: { label: string; value: string; search: string }[] = entireUniqueLocations.map((item) => ({
    label: item,
    value: item,
    search: item,
  }));

  const dateData: { label: string; value: string; search: string }[] = entireUniqueDates.map((item) => ({
    label: item,
    value: item,
    search: item,
  }));

  return (
    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
      <View style={{ width: "80%", backgroundColor: "#ffffff" }}>
        <Dropdown
          data={locationData}
          value={entireSelectedLocation}
          onChange={(item) => {
            setEntireSelectedLocation(item.value);
          }} labelField={"label"} valueField={"value"} />
        <Dropdown
          data={dateData}
          value={entireSelectedDate}
          onChange={(item) => {
            setEntireSelectedDate(item.value);
          }} labelField={"label"} valueField={"value"} />
      </View>
      <ScrollView>
        <Text style={styles.header}>Temperature</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10 }}
        >
          <LineChart
            data={{
              labels: entireLabels,
              datasets: entireRT_AV_TL_datasets.map((dataset) => ({
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
            renderDotContent={renderDotRT_AV_TL_Content}
          />
        </ScrollView>
        <Text style={styles.header}>CO2</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10 }}
        >
          <LineChart
            data={{
              labels: entireLabels,
              datasets: entireCO2_TL_datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.map((value) => Number(value)),
              })),
            }}
            width={2000}
            height={300}
            yAxisSuffix="ppm"
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
                stroke: "red",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 12,
            }}
            withShadow={false}
            renderDotContent={renderDotCO2_TL_Content}
          />
        </ScrollView>
        <Text style={styles.header}>Air Flow</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10 }}
        >
          <LineChart
            data={{
              labels: entireLabels,
              datasets: entireFLW_AV_TL_datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.map((value) => Number(value)),
              })),
            }}
            width={2000}
            height={300}
            yAxisSuffix="L/s"
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
                stroke: "#FF00FF",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 12,
            }}
            withShadow={false}
            renderDotContent={renderDotFLW_AV_TL_Content}
          />
        </ScrollView>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
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
    marginLeft: 10,
  },
});
