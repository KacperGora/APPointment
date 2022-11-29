import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import SettingsDrawerNavigation from "./SettingsDrawerNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";

import ToggleCalendarView from "../components/Header/ToggleCalendarView";
import { colors } from "../components/colors";
import SalonCustomers from "../components/Salon/SalonCustomers/SalonCustomers";
import SalonSummary from "../components/Salon/SalonSummary/SalonSummary";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarScreen from "../screens/Calendar/CalendarHomeScreen";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../types";
function RootTab() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<Navigation>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
      }}
    >
      <Tab.Screen
        options={{
          headerTitle: "",
          headerRight: () => <ToggleCalendarView />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={30}
              color={colors.primary}
            />
          ),
        }}
        name="Wizyty"
        component={CalendarScreen}
      />

      <Tab.Screen
        name="Klienci"
        component={SalonCustomers}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={30} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Analizy"
        component={SalonSummary}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              size={24}
              color={colors.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ustawienia"
        component={SettingsDrawerNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={30} color={colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default RootTab;
