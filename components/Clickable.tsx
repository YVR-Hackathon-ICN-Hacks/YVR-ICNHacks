import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

type IconName = "refresh" | "home" | "plus" | "search" | "map"; // Add more if needed

interface ClickableLinkProps {
  href: string;
  iconName: IconName;
  text: string;
}

const Clickable = ({ href, iconName, text }: ClickableLinkProps) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.clickable}>
      <Link href={href} asChild>
        <Pressable style={styles.pressable}>
          <>
            <FontAwesome
              name={iconName}
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
            <Text style={styles.text}>{text}</Text>
          </>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  clickable: {
    backgroundColor: "#abdbe3",
    padding: 10,
    borderRadius: 10,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default Clickable;
