import React from "react";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import RegularText16 from "../../../Text/RegularText";
import GestureDetectorComponent from "../../../GestureDetectorComponent/GestureDetectorComponent";

const NavbarMonthName = ({
  onGestureStart,
  monthName,
  calendarListVisible,
  disableCalendar,
}) => {
  return (
    <GestureDetectorComponent onGestureStartHandler={onGestureStart}>
      <Pressable
        onPress={onGestureStart}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <RegularText16 textStyles={{ marginLeft: 24, marginRight: 6 }}>
          {monthName}
        </RegularText16>
        {disableCalendar ? null : (
          <Octicons
            name={!calendarListVisible ? "triangle-up" : "triangle-down"}
            size={24}
            color="gray"
          />
        )}
      </Pressable>
    </GestureDetectorComponent>
  );
};
export default NavbarMonthName;
