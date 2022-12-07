import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Targets from "../../components/Settings/Targets/Targets";

const ManageTargetsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Targets />
    </View>
  );
};

export default ManageTargetsScreen;
