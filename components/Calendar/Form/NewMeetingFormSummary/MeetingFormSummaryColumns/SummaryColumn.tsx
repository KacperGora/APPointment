import React from "react";
import { View, Text } from "react-native";
import RegularText16 from "../../../../UI/Text/RegularText";
import SmallText from "../../../../UI/Text/SmallText";

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
// <View
//   style={{
//     marginHorizontal: 12,
//   }}
// >
//   <Text
//     style={{
//       alignSelf: "flex-end",
//       fontWeight: "bold",
//       fontSize: 16,
//     }}
//   >
//     {service?.price}
//   </Text>
//   <SmallText textStyles={{ alignSelf: "flex-end" }}>
//     {hourString} - {endHour.slice(0, 5)}
//   </SmallText>
//   <RegularButton
//     btnStyles={{
//       marginVertical: 12,
//     }}
//     textStyles={{ color: "white", fontWeight: "700", fontSize: 16 }}
//     onPress={submitHandler}
//     title="DODAJ"
//     primary
//   />
// </View>;
