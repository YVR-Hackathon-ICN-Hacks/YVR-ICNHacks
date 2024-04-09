import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import LineChartTab from ".";
import BarChartTab from "./barchart";
import GroupedBarChartTab from "./groupedbarchart";

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
        <Tab.Screen name="Bar Chart" component={BarChartTab} />
        <Tab.Screen name="Grouped Bar Chart" component={GroupedBarChartTab} />
      </Tab.Group>
    </Tab.Navigator>
  );
}
