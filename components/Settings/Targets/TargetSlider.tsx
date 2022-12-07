import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../colors";
const TargetSlider = ({ targetTypeString, sliderHandler, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: colors.greydark, width: 90 }}>
        {targetTypeString}:
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Slider
          style={{ width: 125, height: 50 }}
          minimumValue={100}
          step={100}
          value={value}
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
