import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";


export default function AuthLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>      
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: "Back",
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="details" options={{ presentation: "modal" }} />
          <Stack.Screen name="pages" options={{ presentation: "card" }} />
        </Stack>      
    </QueryClientProvider>
  )
}