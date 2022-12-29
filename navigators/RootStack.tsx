import React, { FunctionComponent, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getStackNavigationScreens } from "./config/navigationConfig";
const Stack = createStackNavigator();
const RootStack: FunctionComponent = () => {
  const stackScreens = useRef(getStackNavigationScreens());
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {stackScreens.current.map((screen) => (
          <Stack.Screen
            key={screen.id}
            component={screen.component}
            name={screen.name}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
