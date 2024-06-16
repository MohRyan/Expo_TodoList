import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, SafeAreaView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          style="light"
          networkActivityIndicatorVisible
          backgroundColor={"#0081f1"}
          animated
        ></StatusBar>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            // paddingLeft: 12,
            // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="SignIn" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="todo" options={{ headerShown: false }} />
            <Stack.Screen name="title/[id]" options={{ headerShown: false }} />
          </Stack>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
