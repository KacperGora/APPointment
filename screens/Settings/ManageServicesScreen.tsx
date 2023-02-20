import React from "react";
import { Button, SafeAreaView, View } from "react-native";
import ManageServices from "../../components/Settings/Services/ManageServices";

const ManageServicesScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ManageServices />
    </View>
  );
};

export default ManageServicesScreen;
