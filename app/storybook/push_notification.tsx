import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Clickable from "@/components/Clickable";
import { usePushNotifications } from "@/constants/usePushNotifications";
import { Text } from "@/components/Themed";

export default function PushNotification() {
  const navigation = useNavigation();
  const { expoPushToken, notification } = usePushNotifications();

  const data = JSON.stringify(notification, null, 2);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Push Notification",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Clickable
        onPress={() => {}}
        text="Send notification"
        iconName="bell"
        href="/storybook/push_notification"
      />
      <Text>{data}</Text>
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eee",
  },
});
