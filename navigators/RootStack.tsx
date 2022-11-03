import React, { FunctionComponent } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import { colors } from "../components/colors";
import Greeting from "../components/Header/Greeting";
import avatar from "../assets/pngwing.com.png";
import Profile from "../components/Header/Profile";
import AddNew from "../screens/AddNew";
import Calendar from "../components/Calendar/Calendar";

export type RootStackParam = {
  Welcome: undefined;
  Home: undefined;
  Add: {
    date: string;
  };
};

const Stack = createStackNavigator<RootStackParam>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.graylight,
            borderBottomWidth: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
            height: 120,
          },
          headerTintColor: colors.secondary,
          headerRightContainerStyle: {
            padding: 25,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRight: () => (
            <Profile
              img={avatar}
              imgContainerStyle={{ backgroundColor: colors.tertiary }}
            />
          ),
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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddNew}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
