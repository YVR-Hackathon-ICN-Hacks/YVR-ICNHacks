import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
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

  // create backend api call for this
  const sendNotification = async () => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken?.data,
        sound: "default",
        title: "Notification Title 🙏",
        body: "Hello worthy user! 🎉",
        data: { someData: "data" },
      }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Clickable
          onPress={sendNotification}
          text="Send notification"
          iconName="bell"
          href="/storybook/push_notification"
        />
        <Text darkColor="#000000">{data}</Text>
        <Text darkColor="#000000">Token: {expoPushToken?.data ?? ""}</Text>
      </ScrollView>
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
