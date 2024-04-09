import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import allData from "../../../constants/allData.json";
import { Reading } from "@/types/types";
import { getDataByAreaCodeAndDate } from "@/api/data/dataApi";

export default function LineChartTab() {
  const entireData = allData.flatMap((locationData) =>
    Object.entries(locationData).flatMap(([location, readings]) =>
      readings.map((reading: Reading) => ({
        ...reading,
        Location: location,
      }))
    )
  );

  // Get unique dates and locations
  const entireUniqueDates = [
    ...new Set(entireData.map((item) => item.Timestamp.split(" ")[0])),
  ];
  const entireUniqueLocations = [
    ...new Set(entireData.map((item) => item.Location)),
  ];

  // State for selected date and location
  const [entireSelectedDate, setEntireSelectedDate] = useState(
    entireUniqueDates[0]
  );
  const [entireSelectedLocation, setEntireSelectedLocation] = useState(
    entireUniqueLocations[0]
  );
  const [labels, setLabels] = useState<string[]>([]);
  const [datasetNew, setDatasetNew] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (entireSelectedLocation && entireSelectedDate) {
      setTimeout(() => {
        setIsLoading(true);
      }, 300);
      const selectedDate = new Date(entireSelectedDate);

      getDataByAreaCodeAndDate(entireSelectedLocation, selectedDate)
        .then((response) => {
          if (response.success && response.data.data) {
            setIsLoading(false);
            const fetchedData = response.data.data;

            const newLabels = fetchedData.map((item: { timestamp: string }) =>
              item.timestamp.split("T")[1].substring(0, 5)
            );
            // sort labels
            const sortedNewLabels = newLabels.sort((a: string, b: string) => {
              const aDate = new Date(`2000-03-22T${a}`);
              const bDate = new Date(`2000-03-22T${b}`);
              return aDate.getTime() - bDate.getTime();
            });

            const tempData = fetchedData.map(
              (item: { temperature: number }) => item.temperature
            );

            console.log("tempData", tempData);

            const newDataset = [
              {
                data: tempData,
                color: () => "blue",
                strokeWidth: 2,
              },
            ];

            setLabels(sortedNewLabels);
            setDatasetNew(newDataset);
          }
        })
        .catch((error) => {
          console.error("Error fetching data!!!!:", error);
        });
    }
  }, [entireSelectedLocation, entireSelectedDate]);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
            labels: labels,
            datasets: datasetNew,
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
