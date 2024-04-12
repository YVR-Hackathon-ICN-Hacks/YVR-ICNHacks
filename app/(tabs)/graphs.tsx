import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import { Reading, ChartDataset } from "@/types/types";
import { getDataByAreaCodeAndDate } from "@/api/data/dataApi";
import { getAreaCode } from "@/api/areaCode/areaCodeApi";
import { Dropdown } from "react-native-element-dropdown";

type TransformedDataType = {
  label: string;
  value: string;
};

export default function LineChartTab() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState([]);
  const [temperatureData, setTemperatureData] = useState<ChartDataset[]>([]);
  const [CO2Data, setCO2Data] = useState<ChartDataset[]>([]);
  const [airflowData, setAirflowData] = useState<ChartDataset[]>([]);
  const [dateData, setDateData] = useState<TransformedDataType[]>([]);
  const [isDateSelectAvailable, setIsDateSelectAvailable] = useState(true);
  const { data: areaCodesData, isLoading: isAreaCodesLoading } = useQuery(
    "areaCodes",
    getAreaCode,
    {
      onSuccess: (data) => {
        // if (data?.data.areaCodes.length > 0) {
        //   const firstAreaCode = data.data.areaCodes[0];
        //   setSelectedLocation(firstAreaCode.areaCode);
        //   setSelectedDate(firstAreaCode.dates[0]);
        // }
      },
    }
  );

  const areaCodes = areaCodesData?.data.areaCodes || [];

  //filter data
  const areaData: TransformedDataType[] = [];
  //const dateData: TransformedDataType[] = [];
  areaCodes.forEach((item) => {
    areaData.push({
      label: item.areaCode,
      value: item.areaCode,
    });
  });
  // if (areaCodes.length > 0 && areaCodes[0].dates) {
  //   areaCodes[0].dates.forEach(item => {
  //     dateData.push({
  //       label: item,
  //       value: item
  //     })
  //   });
  // }

  useEffect(() => {
    // Fetch dateData when selectedLocation changes
    if (selectedLocation && areaCodesData?.data.areaCodes.length > 0) {
      const selectedArea = areaCodesData.data.areaCodes.find(
        (area) => area.areaCode === selectedLocation
      );
      if (selectedArea) {
        updateDateData(selectedArea.dates);
      }
    }
  }, [selectedLocation, areaCodesData]);

  const updateDateData = (dates: string[]) => {
    const transformedDates: TransformedDataType[] = dates.map((date) => ({
      label: date,
      value: date,
    }));
    setDateData(transformedDates);
    setIsDateSelectAvailable(false);
  };

  const { data: chartData, isLoading: isChartDataLoading } = useQuery(
    ["chartData", selectedLocation, selectedDate],
    () => getDataByAreaCodeAndDate(selectedLocation, new Date(selectedDate)),
    {
      enabled: !!selectedLocation && !!selectedDate,
    }
  );

  function delayedFunction() {
    console.log("Delayed function executed!");
  }

  const fetchDataByAreaCodeAndDate = () => {
    if (selectedLocation && selectedDate) {
      setIsLoading(true);
      try {
        let labels: any = [];
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
          const tempTempData = fetchedData.map(
            (item: Reading) => item.temperature
          );
          const tempCO2Data = fetchedData.map((item: Reading) => item.co2);
          const tempAirflowData = fetchedData.map(
            (item: Reading) => item.air_flow
          );
          temperatureDataset = [
            {
              data: tempTempData,
              color: () => "blue",
              strokeWidth: 2,
            },
          ];
          CO2Dataset = [
            {
              data: tempCO2Data,
              color: () => "#fe8286",
              strokeWidth: 2,
            },
          ];
          airflowDataset = [
            {
              data: tempAirflowData,
              color: () => "#ffa5f0",
              strokeWidth: 2,
            },
          ];
          setLabel(labels);
          setTemperatureData(temperatureDataset);
          setCO2Data(CO2Dataset);
          setAirflowData(airflowDataset);
        }
      } catch (error) {
        console.error("❓Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const fetchData = () => {
    fetchDataByAreaCodeAndDate();
  };

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#8cb0ce",
        }}
      >
        <ActivityIndicator size="large" color="#5d8bb0" />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#8cb0ce",
        height: "100%",
      }}
    >
      <View style={styles.dropdownStyles}>
        <Dropdown
          data={areaData}
          value={selectedLocation}
          onChange={(item) => {
            setSelectedLocation(item.value);
          }}
          placeholder="Select Location"
          labelField={"label"}
          valueField={"value"}
          style={styles.dropdownMenu}
          selectedTextStyle={styles.selectedTextStyle}
        />
        <Dropdown
          data={dateData}
          value={selectedDate}
          onChange={(item) => {
            setSelectedDate(item.value);
          }}
          placeholder="Select Date"
          labelField={"label"}
          valueField={"value"}
          style={[styles.dropdownMenu]}
          disable={isDateSelectAvailable}
        />
      </View>
      <View style={{ paddingBottom: 30, backgroundColor: "#8cb0ce" }}>
        <TouchableOpacity style={styles.graphButton} onPress={fetchData}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Display Graph
          </Text>
        </TouchableOpacity>
      </View>
      {temperatureData.length > 0 &&
        CO2Data.length > 0 &&
        airflowData.length > 0 && (
          <ScrollView
            style={styles.chartContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.header}>Temperature</Text>
            {!isLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingHorizontal: 10, backgroundColor: "#8cb0ce" }}
              >
                <LineChart
                  data={{
                    labels: label,
                    datasets: temperatureData,
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
                    backgroundColor: "#d3d3d3",
                    backgroundGradientFrom: "#f0f8ff",
                    backgroundGradientTo: "#f0f8ff",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for contrast
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                      paddingHorizontal: 10,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#000",
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
            )}
            <Text style={styles.header}>CO2</Text>
            {!isLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingHorizontal: 10, backgroundColor: "#8cb0ce" }}
              >
                <LineChart
                  data={{
                    labels: label,
                    datasets: CO2Data,
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
                    backgroundColor: "#d3d3d3",
                    backgroundGradientFrom: "#f0f8ff",
                    backgroundGradientTo: "#f0f8ff",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for contrast
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#000",
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
            )}
            <Text style={styles.header}>Air Flow</Text>
            {!isLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingHorizontal: 10, backgroundColor: "#8cb0ce" }}
              >
                <LineChart
                  data={{
                    labels: label,
                    datasets: airflowData,
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
                    backgroundColor: "#d3d3d3",
                    backgroundGradientFrom: "#f0f8ff",
                    backgroundGradientTo: "#f0f8ff",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for contrast
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#000",
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
            )}
            <View style={styles.box}></View>
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "red",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  dropdownStyles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#8cb0ce",
    marginTop: 40,
    marginBottom: 40,
  },
  dropdownMenu: {
    height: 40,
    marginLeft: 10,
    marginRight: 20,
    width: 160,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  box: {
    height: 50,
    backgroundColor: "#8cb0ce",
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: "#8cb0ce",
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  dropdownItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#FFF",
  },
  dropdownItem: {
    fontSize: 8,
  },
  graphButton: {
    backgroundColor: "#009E60",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
