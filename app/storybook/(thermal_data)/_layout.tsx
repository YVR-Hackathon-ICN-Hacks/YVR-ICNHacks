import React, { useLayoutEffect } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import LineChartTab from ".";
import TimeSeriesChart from "./timeserieschart";
import MiniTabThree from "./minitabthree";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thermal Data",
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="ThermalData">
      <Tab.Group>
        <Tab.Screen name="Line Chart" component={LineChartTab} />
        <Tab.Screen name="Time Series Chart" component={TimeSeriesChart} />
        <Tab.Screen name="Three" component={MiniTabThree} />
      </Tab.Group>
    </Tab.Navigator>
  );
}
