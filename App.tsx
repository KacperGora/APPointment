import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import RootStack from "./navigators/RootStack";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import MeetingsProvider from "./store/CalendarStore";
import SaloonProvider from "./store/SaloonStore";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <MeetingsProvider>
      <SaloonProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <RootStack />
        </View>
      </SaloonProvider>
    </MeetingsProvider>
  );
}
