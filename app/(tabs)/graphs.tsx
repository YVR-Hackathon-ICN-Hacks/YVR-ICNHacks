import React, { useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "react-query";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import {
  Reading,
  ChartDataset,
  PickerComponentProps,
  Location,
} from "@/types/types";
import { getDataByAreaCodeAndDate } from "@/api/data/dataApi";
import { getAreaCode } from "@/api/areaCode/areaCodeApi";
import { Dropdown } from 'react-native-element-dropdown';

type TransformedDataType = {
  label: string;
  value: string;
};

export default function LineChartTab() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data: areaCodesData, isLoading: isAreaCodesLoading } = useQuery(
    "areaCodes",
    getAreaCode,
    {
      onSuccess: (data) => {
        if (data?.data.areaCodes.length > 0) {
          const firstAreaCode = data.data.areaCodes[0];
          setSelectedLocation(firstAreaCode.areaCode);
          setSelectedDate(firstAreaCode.dates[0]);
        }
      },
    }
  );

  const areaCodes = areaCodesData?.data.areaCodes || [];

  //filter data
  const areaData: TransformedDataType[] = [];
  const dateData: TransformedDataType[] = [];
  areaCodes.forEach(item => {
    areaData.push({
      label: item.areaCode,
      value: item.areaCode
    })
  });
  if (areaCodes.length > 0 && areaCodes[0].dates) {
    areaCodes[0].dates.forEach(item => {
      dateData.push({
        label: item,
        value: item
      })
    });
  }


  const { data: chartData, isLoading: isChartDataLoading } = useQuery(
    ["chartData", selectedLocation, selectedDate],
    () => getDataByAreaCodeAndDate(selectedLocation, new Date(selectedDate)),
    {
      enabled: !!selectedLocation && !!selectedDate,
    }
  );

  const isLoading = isAreaCodesLoading || isChartDataLoading;

  let labels = [];
  let temperatureDataset: ChartDataset[] = [];
  let CO2Dataset: ChartDataset[] = [];
  let airflowDataset: ChartDataset[] = [];
  if (chartData?.success) {
    const fetchedData = chartData.data.data;
    labels = fetchedData.map((item: Reading) =>
      (typeof item.timestamp === "string" ? item.timestamp : "")
        .split("T")[1]
        .substring(0, 5)
    );
    const temperatureData = fetchedData.map((item: Reading) => item.temperature);
    const CO2Data = fetchedData.map((item: Reading) => item.co2);
    const airflowData = fetchedData.map((item: Reading) => item.air_flow);
    temperatureDataset = [
      {
        data: temperatureData,
        color: () => "blue",
        strokeWidth: 2,
      },
    ];
    CO2Dataset = [
      {
        data: CO2Data,
        color: () => "#fe8286",
        strokeWidth: 2,
      },
    ];
    airflowDataset = [
      {
        data: airflowData,
        color: () => "#ffa5f0",
        strokeWidth: 2,
      },
    ];
  }

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size="large" color="#5d8bb0" />
      </View>
    );
  }

  if (temperatureDataset.length === 0) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>No data found for this location and date</Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={styles.dropdownStyles}>
        <Dropdown
          data={areaData}
          value={selectedLocation}
          onChange={(item) => {
            setSelectedLocation(item.value);
          }}
          labelField={"label"}
          valueField={"value"}
          style={styles.dropdownMenu}
        />
        <Dropdown
          data={dateData}
          value={selectedDate}
          onChange={(item) => {
            setSelectedDate(item.value);
          }}
          labelField={"label"}
          valueField={"value"}
          style={styles.dropdownMenu}
        />
      </View>
      <ScrollView>
        <Text style={styles.header}>Temperature</Text>
        {
          !isLoading && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 10 }}
            >
              <LineChart
                data={{
                  labels: labels,
                  datasets: temperatureDataset,
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
          )
        }
        <Text style={styles.header}>CO2</Text>
        {
          !isLoading && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 10 }}
            >
              <LineChart
                data={{
                  labels: labels,
                  datasets: CO2Dataset,
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
          )
        }
        <Text style={styles.header}>Air Flow</Text>
        {
          !isLoading && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 10 }}
            >
              <LineChart
                data={{
                  labels: labels,
                  datasets: airflowDataset,
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
          )
        }
      </ScrollView>
    </View >
  );
}

function PickerComponent({
  areaCodes,
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
}: PickerComponentProps) {
  // When a new location is selected, update the selected location and date accordingly
  const onLocationChange = (itemValue: Location) => {
    setSelectedLocation(itemValue as unknown as string);
    const selectedArea = areaCodes.find(
      (location: Location) => location.areaCode === itemValue.areaCode
    );
    if (selectedArea) {
      const dates = selectedArea.dates || [];
      setSelectedDate(dates.length > 0 ? dates[0] : "");
    }
  };

  // Find the selected area code to list its dates
  const selectedArea = areaCodes.find(
    (location: Location) => location.areaCode === selectedLocation
  ) || { dates: [] };

  return (
    <View
      style={{ width: "60%", justifyContent: "center", alignSelf: "center" }}
    >
      <Picker
        selectedValue={selectedLocation as unknown as Location}
        onValueChange={onLocationChange}
        itemStyle={{ fontSize: 18, height: 150 }}
      >
        {areaCodes.map((location: Location) => (
          <Picker.Item
            label={location.areaCode}
            value={location.areaCode}
            key={location.areaCode}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue: string) => setSelectedDate(itemValue)}
        itemStyle={{ fontSize: 18, height: 150 }}
      >
        {selectedArea.dates.map((date: string) => (
          <Picker.Item label={date} value={date} key={date} />
        ))}
      </Picker>
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
  dropdownStyles: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#FFF",
    marginTop: 40,
    marginBottom: 40,
  },
  dropdownMenu: {
    marginLeft: 10,
    marginRight: 20,
    width: 150
  }
});
