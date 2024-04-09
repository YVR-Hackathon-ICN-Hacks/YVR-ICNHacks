import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import LineChartTab from ".";
import BarChartTab from "./barchart";
import AreaChartTab from "./areachart";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sunlight Exposure",
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="SunlightExposure">
      <Tab.Group>
        <Tab.Screen name="Line Chart" component={LineChartTab} />
        <Tab.Screen name="Bar Chart" component={BarChartTab} />
        <Tab.Screen name="Area Chart" component={AreaChartTab} />
      </Tab.Group>
    </Tab.Navigator>
  );
}
