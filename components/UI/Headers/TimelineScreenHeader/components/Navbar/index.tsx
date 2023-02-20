import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import NavbarMonthName from "../NavbarMonthName";
import { RowContainer, ScreenWidth } from "../../../../../shared";
import { NavbarProps } from "../../../../../../types";
import { View } from "react-native";

const Navbar: React.FC<NavbarProps> = ({
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
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <RowContainer style={{ flex: 1 }}>
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
      </RowContainer>
      <RowContainer
        style={{
          width: ScreenWidth / 2,
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        {disableSearchBar ? null : (
          <Ionicons
            name="md-search"
            size={24}
            color="gray"
            onPress={searchIconPressHandler}
            style={{ marginRight: 12 }}
          />
        )}
        <Ionicons
          name="ios-today-outline"
          size={24}
          color="gray"
          onPress={calendarIconPressHandler}
          style={{ marginRight: 12 }}
        />
      </RowContainer>
    </View>
  );
};

export default Navbar;
