import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import { colors } from "../components/colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  getCalendarDrawerNavigation,
  getTabNavigationScreens,
} from "./config/navigationConfig";
export const CalendarDrawerNav = () => {
  const Drawer = createDrawerNavigator();
  const calendarDrawerScreens = useRef(getCalendarDrawerNavigation());

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
        drawerActiveBackgroundColor: "#85c6d841",
        drawerActiveTintColor: "black",
        drawerStatusBarAnimation: "fade",
      }}
    >
      {calendarDrawerScreens.current.map((screen) => (
        <Drawer.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={{
            drawerIcon: () => (
              <screen.iconFamily
                name={screen.iconName}
                size={24}
                color={colors.greydark}
              />
            ),
          }}
          initialParams={{ viewMode: screen.viewMode }}
        />
      ))}
    </Drawer.Navigator>
  );
};
function RootTab() {
  const Tab = createBottomTabNavigator();
  const tabNavigationScreens = useRef(getTabNavigationScreens());
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
      }}
    >
      {tabNavigationScreens.current.map((screen) => (
        <Tab.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <screen.iconFamily
                name={screen.iconName}
                size={30}
                color={colors.primary}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
export default RootTab;
