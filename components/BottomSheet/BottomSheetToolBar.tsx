import React from "react";
import { View } from "react-native";
import { ScreenWidth } from "../shared";
import BottomSheetToolBarShortInformation from "./BottomSheetToolBarEditingEvent";
import getIconsConfig from "./config/icons";
import { AntDesign } from "@expo/vector-icons";
const BottomSheetToolBar = ({
  editEventHandler,
  deleteEventHandler,
  data,
  editedEventDraft,
  eventMove,
  index,
}) => {
  const icons = getIconsConfig(
    eventMove,
    editEventHandler,
    deleteEventHandler,
    index
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: !!editEventHandler ? 12 : 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: ScreenWidth / 5,
        }}
      >
        {icons.map((el) => {
          return (
            <AntDesign
              name={el.name}
              key={el.key}
              onPress={el.onPress}
              style={el.style}
              size={24}
              color={el.color}
            />
          );
        })}
      </View>
    </View>
  );
};
export default BottomSheetToolBar;
