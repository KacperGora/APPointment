import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../screens/Welcome";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import Home from "../screens/Home";
import { colors } from "../components/colors";
import AddNew from "../screens/AddNew";
import MeetingsProvider from "../store/store";
import SalonSummary from "../components/Salon/SalonSummary/SalonSummary";
import SalonCustomers from "../components/Salon/SalonCustomers/SalonCustomers";
import SalonIncomings from "../components/Salon/SalonIncomings/SalonIncomings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimelineScreen from "../components/Calendar/TimeLine/TimelineScreen";
import { Text } from "react-native";
import { color } from "react-native-reanimated";
import ToggleCalendarView from "../components/Header/ToggleCalendarView";


export type RootStackParam = {
  Welcome: undefined;
  Timeline: undefined;
  Home: undefined;
  Add: {
    date: string;
  };
};

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={30} color={color} />
          ),
        }}
        name="Podsumowanie"
        component={SalonSummary}
      />
      <Tab.Screen
        name="Klieci"
        component={SalonCustomers}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Przychody"
        component={SalonIncomings}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="analytics" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<RootStackParam>();

const Tab = createBottomTabNavigator();
const RootStack: FunctionComponent = () => {
  return (
    <MeetingsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.graylight,
              borderBottomWidth: 0,
              elevation: 0,
            },

            headerTintColor: colors.secondary,
            headerRightContainerStyle: {
              padding: 25,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: "",
              // headerStyle: { height: 120 },
              headerLeft: () => null,
              headerRight: () => <ToggleCalendarView />,
            }}
          />
          <Stack.Screen
            name="Timeline"
            component={TimelineScreen}
            options={{
              // headerShown: false,
              // headerTitle: "",
              // // headerStyle: { height: 90 },
              // headerRight: () => <ToggleTimelineDays />,
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddNew}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MeetingsProvider>
  );
};
export default RootStack;
