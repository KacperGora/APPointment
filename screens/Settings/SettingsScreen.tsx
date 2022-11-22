import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHome from "../../components/Settings/SettingsHome";

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <SettingsHome />
    </SafeAreaView>
  );
};
export default SettingsScreen;
