import { View, StyleSheet } from "react-native";
import Clickable from "@/components/Clickable";
import { ScrollView } from "react-native";

export default function StoryBook() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.separator} />
        <Clickable
          href="/storybook/refresh"
          iconName="refresh"
          text="Refresh"
        />
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
          iconName="map"
          text="Google Map"
        />
        <Clickable
          href="/storybook/push_notification"
          iconName="bell"
          text="Push Notification"
        />
        <Clickable
          href="/storybook/fetchTest"
          iconName="coffee"
          text="fetchTest"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    rowGap: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
});
