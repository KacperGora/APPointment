import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import ManageTargetsScreen from "../screens/Settings/ManageTargetsScreen";
import ManageCustomersScreen from "../screens/Settings/ManageCustomersScreen";
import ManageServicesScreen from "../screens/Settings/ManageServicesScreen";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ManageUnavailableHoursScreen from "../screens/Settings/ManageUnavailableHoursScreen";
import { Navigation } from "../types";

const SettingsDrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation<Navigation>();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "red",
        drawerIcon: () => <MaterialIcons name="menu" size={24} color="black" />,
        headerTitle: "",
      }}
    >
      <Drawer.Screen
        name="Targety"
        component={ManageTargetsScreen}
        options={{
          drawerIcon: () => <Feather name="target" size={24} color="black" />,
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Klienci"
        component={ManageCustomersScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),

          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Usługi"
        component={ManageServicesScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="offer" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Godziny"
        component={ManageUnavailableHoursScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="ios-hourglass" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default SettingsDrawerNavigation;
