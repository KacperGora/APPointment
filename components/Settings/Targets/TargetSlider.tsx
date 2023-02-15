import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../colors";
import { RowContainer, ScreenWidth } from "../../shared";
import SmallText from "../../UI/Text/SmallText";
const TargetSlider = ({ targetTypeString, sliderHandler, value }) => {
  return (
    <RowContainer
      style={{
        justifyContent: "flex-start",
      }}
    >
      <SmallText textStyles={{ width: ScreenWidth * 0.25 }}>
        {targetTypeString}:
      </SmallText>
      <RowContainer>
        <Slider
          style={{ width: 125, height: 50 }}
          minimumValue={100}
          step={100}
          value={value}
          maximumValue={10000}
          minimumTrackTintColor={colors.accent}
          maximumTrackTintColor="#000000"
          onValueChange={sliderHandler}
        />
      </RowContainer>
    </RowContainer>
  );
};
export default TargetSlider;
