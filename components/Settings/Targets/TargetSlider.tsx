import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../colors";
import SaloonStoreProvider, { SaloonContext } from "../../../store/SaloonStore";
import SaloonProvider from "../../../store/SaloonStore";
const TargetSlider = ({ targetTypeString, targetTypeState, sliderHandler }) => {
  return (
    <View style={{ marginHorizontal: 12 }}>
      <Text>Ustaw {targetTypeString} cel</Text>
      <View style={{ flexDirection: "row" }}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          step={10}
          maximumValue={8000}
          minimumTrackTintColor={colors.accent}
          maximumTrackTintColor="#000000"
          onValueChange={sliderHandler}
        />
      </View>
    </View>
  );
};
export default TargetSlider;
