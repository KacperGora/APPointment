import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaContainer } from "../../shared";

const MyStatusBar = ({ children }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {children}
      </SafeAreaContainer>
    </View>
  );
};

export default MyStatusBar;
