import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#c0c0c0",
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            height: 90,
            borderColor: "#5d8bb0",
            borderTopColor: "#5d8bb0",
            backgroundColor: "#5d8bb0",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => (
              <Link href="/details" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color="#fff"
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#8cb0ce",
              borderColor: "#8cb0ce",
              borderBottomColor: "#8cb0ce",
              borderBottomWidth: 10,
            },
          }}
        />
        <Tabs.Screen
          name="graphs"
          options={{
            title: "Data",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="bar-chart" color={color} />
            ),
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#8cb0ce",
            },
          }}
        />
        <Tabs.Screen
          name="storybook"
          options={{
            title: "Storybook",
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#8cb0ce",
            },
          }}
        />
      </Tabs>
    </>
    </QueryClientProvider>
  );
}
