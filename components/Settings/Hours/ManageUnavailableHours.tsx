import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { SaloonContext } from "../../../store/SaloonStore";
import pickHandler from "../../../Utils/pickHandler";

import HoursSettings from "./HoursSettings";

const ManageUnavailableHours = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HoursSettings />
    </View>
  );
};
export default ManageUnavailableHours;
