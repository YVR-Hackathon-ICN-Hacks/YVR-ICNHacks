import { StyleSheet, Dimensions } from "react-native";
//import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup  } from 'victory-native';
import { Text, View } from "@/components/Themed";
import { Svg, Rect } from 'react-native-svg';
const screenWidth = Dimensions.get("window").width;
const barWidth = screenWidth / 28; // 일주일에 3개 방 + 여백을 고려하여 계산

const GroupedBarChartTab = () => {
  return (
    <View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default GroupedBarChartTab;
