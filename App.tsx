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
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLayoutAnimations } from "react-native-reanimated";
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Material Design Icons": require("./assets/fonts/MaterialCommunityIcons.ttf"),
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
  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local noti",
        body: "This is the body.",
        data: { userName: "Kacper" },
        vibrate: [10, 50, 250],
      },
      trigger: {
        seconds: 30,
      },
    });
  };
  scheduleNotificationHandler();
  
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
