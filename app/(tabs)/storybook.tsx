import { View, StyleSheet } from "react-native";
import Clickable from "@/components/Clickable";

export default function StoryBook() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Clickable href="/storybook/refresh" iconName="refresh" text="Refresh" />
      <Clickable
        href="/storybook/authentication"
        iconName="home"
        text="Authentication"
      />
      <Clickable
        href="/storybook/(ministack)"
        iconName="plus"
        text="Top Stack Navigator"
         />
      <Clickable 
        href="/storybook/google_map"
        iconName = "map"
        text="Google Map" 
      />
      <Clickable
        href="/storybook/push_notification"
        iconName="bell"
        text="Push Notification"
      />
      <Clickable 
        href="/storybook/fetchTest"
        iconName = "coffee"
        text="fetchTest" 
      />
      <Clickable
        href="/storybook/list"
        iconName="list"
        text="Lists"
      />
      <Clickable
        href="/storybook/(thermal_data)"
        iconName="plus"
        text="Thermal Data"
      />
      <Clickable
        href="/storybook/(sunlight_exposure)"
        iconName="plus"
        text="Sunlight Exposure"
      />
      <Clickable
        href="/storybook/(hvac_performance)"
        iconName="plus"
        text="HVAC Performance"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    rowGap: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
});
