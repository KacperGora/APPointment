import { uniqueId } from "lodash";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../../../../colors";
import SmallText from "../../../../UI/Text/SmallText";

const SpendingTiles = ({ data, pressHandler }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        alignItems: "flex-start",
        marginHorizontal: 2,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {data.map((el, idx) => (
        <TouchableOpacity
          key={uniqueId()}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 8,
            margin: 4,
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: colors.gray,
            backgroundColor: "white",
            borderRadius: 12,
            marginVertical: 4,
            shadowColor: "lightgray",
            shadowOffset: { width: 4, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
          onPress={() => pressHandler(el)}
        >
          <SmallText textStyles={{ textAlign: "center" }} key={idx}>
            {el.long || el.label}
          </SmallText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default SpendingTiles;
