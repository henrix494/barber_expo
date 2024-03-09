import { Stack } from "expo-router/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar animated={true} style={"light"} backgroundColor="black" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },

          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </SafeAreaProvider>
  );
}
