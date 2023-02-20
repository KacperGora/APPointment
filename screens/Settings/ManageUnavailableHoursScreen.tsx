import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ManageUnavailableHours from "../../components/Settings/Hours/ManageUnavailableHours";

const ManageUnavailableHoursScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor={"white"} /> */}
      <ManageUnavailableHours />
    </View>
  );
};

export default ManageUnavailableHoursScreen;
