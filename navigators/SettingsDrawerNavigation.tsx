import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getDrawerNavigationScreens } from "./config/navigationConfig";
const SettingsDrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const drawerScreens = useRef(getDrawerNavigationScreens());
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "red",
        drawerIcon: () => <MaterialIcons name="menu" size={24} color="black" />,
        headerTitle: "",
      }}
    >
      {drawerScreens.current.map((screen) => (
        <Drawer.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={{
            drawerIcon: () => (
              <screen.iconFamily
                name={screen.iconName}
                size={24}
                color="black"
              />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};
export default SettingsDrawerNavigation;
