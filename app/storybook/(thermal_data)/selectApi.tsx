import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "@/components/Themed";
import { Reading, ChartDataset, AreaCode, Location } from "@/types/types";
import { getDataByAreaCodeAndDate } from "@/api/data/dataApi";
import { getAreaCode } from "@/api/areaCode/areaCodeApi";

export default function LineChartTab() {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasetNew, setDatasetNew] = useState<ChartDataset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationAreaCodes, setLocationAreaCodes] = useState<AreaCode[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);

  useEffect(() => {
    // Function to fetch area codes
    const fetchAreaCode = async () => {
      setIsLoading(true);
      try {
        const response = await getAreaCode();
        if (response.success) {
          // Store the full area code objects
          setLocationAreaCodes(response.data.areaCodes);
          // Set the first area code as the default selected location
          setSelectedLocation(response.data.areaCodes[0].areaCode);
          setUniqueDates(response.data.areaCodes[0].dates);
        } else {
          console.error("Error fetching data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAreaCode();
  }, []);

  const fetchDataByAreaCodeAndDate = () => {
    if (locationAreaCodes && uniqueDates) {
      setIsLoading(true);
      const formattedDate = new Date(selectedDate);

      getDataByAreaCodeAndDate(selectedLocation, formattedDate)
        .then((response) => {
          if (response.success) {
            const fetchedData = response.data.data;
            const timeLabels =
              fetchedData && Array.isArray(fetchedData)
                ? fetchedData.map((item) =>
                  typeof item.timestamp === "string"
                    ? item.timestamp.split("T")[1].substring(0, 5)
                    : ""
                )
                : [];

            const tempData = fetchedData.map(
              (item: Reading) => item.temperature
            );

            const newDataset = [
              {
                data: tempData,
                color: () => "blue",
                strokeWidth: 2,
              },
            ];

            setLabels(timeLabels);
            setDatasetNew(newDataset);
          }
        })
        .catch((error) => {
          console.error("❓Error fetching data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location.areaCode);
    setUniqueDates(location.dates);
    setSelectedDate(location.dates[0]);
    setLocationModalVisible(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setDateModalVisible(false);
  };

  const fetchData = () => {
    fetchDataByAreaCodeAndDate();
  };

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <View style={{ paddingTop: 80 }}>
          <ActivityIndicator size="large" color="#5d8bb0" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "80%" }}>
        <TouchableOpacity
          onPress={() => setLocationModalVisible(true)}
          style={styles.button}
        >
          <Text>{selectedLocation || "Select Location"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDateModalVisible(true)}
          style={styles.button}
        >
          <Text>{selectedDate || "Select Date"}</Text>
        </TouchableOpacity>

        <Button title="Fetch Data" onPress={fetchData} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={isLocationModalVisible}
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalView}>
            <FlatList
              data={locationAreaCodes}
              keyExtractor={(item) => item.areaCode}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLocationSelect(item)}
                  style={styles.modalItem}
                >
                  <Text>{item.areaCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDateModalVisible}
          onRequestClose={() => setDateModalVisible(false)}
        >
          <View style={styles.modalView}>
            <FlatList
              data={uniqueDates}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleDateSelect(item)}
                  style={styles.modalItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
      <Text style={styles.header}>Temperature</Text>
      {datasetNew.length > 0 && (
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
      )}
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
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 5,
  },
  modalView: {
    top: 50,
    width: "80%",
    margin: 30,
    backgroundColor: "#EAF4FD",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    marginVertical: 2,
  },
});
