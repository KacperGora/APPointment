import React from "react";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import RegularText16 from "../../../Text/RegularText";

const NavbarMonthName = ({
  onGestureStart,
  monthName,
  calendarListVisible,
  disableCalendar,
}) => {
  const show = Gesture.Pan().onStart(onGestureStart);

  return (
    <GestureDetector gesture={show}>
      <Pressable
        onPress={onGestureStart}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 150,
        }}
      >
        <RegularText16 textStyles={{ marginRight: 6 }}>
          {monthName}
        </RegularText16>
        {disableCalendar ? null : (
          <Octicons
            style={{ alignSelf: "center" }}
            name={!calendarListVisible ? "triangle-up" : "triangle-down"}
            size={24}
            color="gray"
          />
        )}
      </Pressable>
    </GestureDetector>
  );
};
export default NavbarMonthName;
