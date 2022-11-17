import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import RootStack from "./navigators/RootStack";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase/firebase";

export default function App() {
 
  let [fontLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return <RootStack />;
}
