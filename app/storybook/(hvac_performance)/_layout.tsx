import React, { useLayoutEffect } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import LineChartTab from ".";
import BarChartTab from "./barchart";
import PieChartTab from "./piechart";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "HVAC Performance",
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="HVACPerformance">
      <Tab.Group>
        <Tab.Screen name="Line Chart" component={LineChartTab} />
        <Tab.Screen name="Bar Chart" component={BarChartTab} />
        <Tab.Screen name="Pie Chart" component={PieChartTab} />
      </Tab.Group>
    </Tab.Navigator>
  );
}
