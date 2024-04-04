import { View, StyleSheet } from "react-native";
import Clickable from "@/components/Clickable";
import React from "react";
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
        href="/storybook/google_map"
        iconName = "map"
        text="Google Map" 
      />
      <Clickable 
        href="/storybook/camera"
        iconName="camera"
        text="Camera"
      />
      <Clickable 
        href="/storybook/list"
        iconName="list"
        text="List"
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