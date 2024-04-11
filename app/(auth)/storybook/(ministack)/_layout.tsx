import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import MiniTabOne from ".";
import MiniTabTwo from "./minitabtwo";
import MiniTabThree from "./minitabthree";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Top Tab Navigator",
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="MiniTabOne">
      <Tab.Group>
        <Tab.Screen name="One" component={MiniTabOne} />
        <Tab.Screen name="Two" component={MiniTabTwo} />
        <Tab.Screen name="Three" component={MiniTabThree} />
      </Tab.Group>
    </Tab.Navigator>
  );
}
