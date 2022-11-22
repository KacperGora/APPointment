import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../screens/Welcome";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "../screens/Calendar/Home";
import { colors } from "../components/colors";

import MeetingsProvider from "../store/CalendarStore";
import SalonSummary from "../components/Salon/SalonSummary/SalonSummary";
import SalonCustomers from "../components/Salon/SalonCustomers/SalonCustomers";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimelineScreen from "../components/Calendar/TimeLine/TimelineScreen";
import ToggleCalendarView from "../components/Header/ToggleCalendarView";
import AddMeetingForm from "../components/Calendar/Form/AddMeetingForm";
import SaloonProvider from "../store/SaloonStore";
import { MaterialIcons } from "@expo/vector-icons";
import Targets from "../components/Settings/Targets/Targets";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AddNewCustomer from "../components/Settings/Customers/AddNewCustomer";
import ManageServices from "../components/Settings/Servives/ManageServices";
const Drawer = createDrawerNavigator();
const SettingsDrawer = () => {
  const navigation = useNavigation();
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
        component={Targets}
        options={{
          drawerIcon: () => <Feather name="target" size={24} color="black" />,
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Klienci"
        component={SalonCustomers}
        options={{
          drawerIcon: () => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),
          headerRight: () => (
            <AntDesign
              onPress={() => navigation.navigate("AddNewUser")}
              name="adduser"
              size={28}
              color="black"
            />
          ),
          headerRightContainerStyle: { paddingRight: 12 },
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Usługi"
        component={ManageServices}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="offer" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
function SalonNav() {
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
        component={Home}
      />

      <Tab.Screen
        name="Klienci"
        component={SalonCustomers}
        options={{
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
        component={SettingsDrawer}
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

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const RootStack: FunctionComponent = () => {
  return (
    <MeetingsProvider>
      <SaloonProvider>
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
              component={SalonNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Timeline"
              component={TimelineScreen}
              options={{
                // headerShown: false,
                headerStyle: { backgroundColor: colors.white },
              }}
            />
            <Stack.Screen name="AddNewUser" component={AddNewCustomer} />
            <Stack.Screen
              name="Add"
              component={AddMeetingForm}
              options={{
                presentation: "modal",
                headerBackTitle: "Umów wizytę",
                headerBackTitleStyle: {
                  fontSize: 24,
                  fontWeight: "600",
                },
                headerTitle: "",
                headerTitleStyle: {
                  fontSize: 24,
                },
                headerStyle: {
                  backgroundColor: colors.graylight,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SaloonProvider>
    </MeetingsProvider>
  );
};
export default RootStack;
