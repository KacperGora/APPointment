import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { colors } from "../components/colors";
import MeetingsProvider from "../store/CalendarStore";
import TimelineScreen from "../components/Calendar/TimeLine/Timeline";
import AddMeetingForm from "../components/Calendar/Form/NewMeetingForm";
import SaloonProvider from "../store/SaloonStore";
import AddNewCustomer from "../components/Salon/SalonCustomers/AddNewCustomerForm";
import ToggleCalendarOptions from "../components/Header/ToggleCalendarOptions";
import RootTab from "./RootTab";
import LandingScreen from "../screens/LandingScreen";

const Stack = createStackNavigator();

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
              component={LandingScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={RootTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Timeline"
              component={TimelineScreen}
              options={{
                // headerShown: false,
                headerTitle: "",
                headerLeftLabelVisible: false,
                headerTintColor: colors.primary,
                headerRight: () => <ToggleCalendarOptions />,
                headerStyle: { backgroundColor: colors.white },
              }}
            />
            <Stack.Screen
              name="AddNewUser"
              component={AddNewCustomer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddEvent"
              component={AddMeetingForm}
              options={{
                presentation: "modal",
                headerBackTitle: "Umów wizytę",
                headerBackTitleStyle: {
                  fontSize: 18,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  fontWeight: "600",
                },
                headerTitle: "",

                headerStyle: {
                  backgroundColor: colors.white,
                  height: 50,
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
