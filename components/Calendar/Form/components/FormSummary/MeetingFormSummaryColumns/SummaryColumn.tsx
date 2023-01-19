import React from "react";
import { View, Text } from "react-native";
import SmallText from "../../../../../UI/Text/SmallText";

const SummaryColumn = ({ data }) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: 6,
          paddingVertical: 12,
        },
      ]}
    >
      <View style={{ marginVertical: 6 }}>
        <Text style={{ color: "black", ...data.title.styling }}>
          {data.title.value}
        </Text>
      </View>
      {!data.subTitle.value.start ? (
        <Text>{data.subTitle.value}</Text>
      ) : (
        <Text style={{ ...data.subTitle.styling }}>
          {data.subTitle.value.start} - {data.subTitle.value.end}
        </Text>
      )}
      <SmallText textStyles={{ fontSize: 10, marginVertical: 4 }}>
        {data.detail}
      </SmallText>
    </View>
  );
};
export default SummaryColumn;
