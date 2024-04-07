import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-gifted-charts';
import { Text, View } from "@/components/Themed";

const screenWidth = Dimensions.get("window").width;

const sunlightData = [
  {value: 2, label: '00:00'},
  {value: 2.25, label: '04:00'},
  {value: 5.75, label: '08:00'},
  {value: 4.8, label: '12:00'},
  {value: 2.2, label: '16:00'},
  {value: 1.5, label: '20:00'},
  {value: 0, label: '24:00'},
]


export default function AreaChartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Sunlight Exposure Over Time</Text>
      <LineChart
        areaChart
        data={sunlightData}
        width={screenWidth}
        height={300}
        textColor="black"
        textShiftX={10}
        textShiftY={15}
        textFontSize={15}
        hideRules
        color1="#fe9599"
        dataPointsColor1="#f0353c"
        showValuesAsDataPointsText
        dataPointsHeight={4}
        initialSpacing={20}
        yAxisTextStyle={{ fontSize: 10 }}
        focusEnabled
        showTextOnFocus
        showStripOnFocus
        showDataPointOnFocus
        curved
        startFillColor="#fe5b61"
        endFillColor="#ffffff"
        startOpacity={0.5}
        endOpacity={0.3}
        noOfSections={5}
        maxValue={10}
        focusedDataPointRadius={5}
        focusedDataPointColor="#fe5b61"
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

