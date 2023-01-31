import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { colors } from "../colors";
import { ScreenWidth } from "../shared";

const BottomSheetToolBar = ({ editEventHandler, deleteEventHandler }) => {
  const icons = [
    {
      render: (
        <AntDesign
          key={1}
          name="edit"
          onPress={editEventHandler}
          color={colors.greydark}
          size={24}
        />
      ),
    },
    {
      render: (
        <AntDesign
          key={2}
          name="delete"
          onPress={deleteEventHandler}
          color={colors.greydark}
          size={24}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        width: ScreenWidth / 4,
      }}
    >
      {icons.map((el) => {
        return el.render;
      })}
    </View>
  );
};
export default BottomSheetToolBar;
