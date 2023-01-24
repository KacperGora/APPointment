import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import NavbarMonthName from "../NavbarMonthName";
const Navbar = ({
  monthName,
  onGestureStart,
  searchIconPressHandler,
  onTodayIconPressHandler,
  disableSearchBar,
  disableCalendar,
}) => {
  const menuIconPressHandler = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const calendarIconPressHandler = () => {
    onTodayIconPressHandler();
  };
  const navigation = useNavigation();
  return (
    <>
      <Ionicons
        name="menu"
        size={32}
        color="gray"
        onPress={menuIconPressHandler}
      />
      <NavbarMonthName
        calendarListVisible={true}
        monthName={monthName}
        onGestureStart={onGestureStart}
        disableCalendar={disableCalendar}
      />
      {disableSearchBar ? null : (
        <Ionicons
          name="md-search"
          size={24}
          color="gray"
          onPress={searchIconPressHandler}
        />
      )}
      <Ionicons
        name="ios-today-outline"
        size={24}
        color="gray"
        onPress={calendarIconPressHandler}
      />
    </>
  );
};

export default Navbar;
