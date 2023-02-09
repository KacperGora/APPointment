import React from "react";
import { View } from "react-native";
import { RowContainer, ScreenWidth } from "../shared";
import RegularText16 from "../UI/Text/RegularText";
import SmallText from "../UI/Text/SmallText";

const BottomSheetToolBarShortInformation = ({ data }) => {
  return (
    <RowContainer
      style={{ width: ScreenWidth * 0.7, padding: 6, marginVertical: 12 }}
    >
      <View>
        <RegularText16>{data.customerName}</RegularText16>
        <SmallText>{data.serviceValue}</SmallText>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          marginHorizontal: ScreenWidth / 12,
        }}
      >
        <SmallText>
          {data.startHour} - {data.endHour}
        </SmallText>
        <SmallText textStyles={{ fontSize: 12 }}>{data.dateString}</SmallText>
      </View>
    </RowContainer>
  );
};
export default BottomSheetToolBarShortInformation;
