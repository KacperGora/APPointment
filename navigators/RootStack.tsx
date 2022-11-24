import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { colors } from "../components/colors";
import MeetingsProvider from "../store/CalendarStore";
import TimelineScreen from "../components/Calendar/TimeLine/TimelineScreen";
import AddMeetingForm from "../components/Calendar/Form/AddMeetingForm";
import SaloonProvider from "../store/SaloonStore";
import AddNewCustomer from "../components/Settings/Customers/AddNewCustomerForm";
import ToggleCalendarOptions from "../components/Header/ToggleCalendarOptions";
import RootTab from "./RootTab";

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
              component={Welcome}
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
