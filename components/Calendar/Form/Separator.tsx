import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../colors";

const Separator = ({ children }) => {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        marginBottom: 2,
        width: "90%",
        alignSelf: "center",
        paddingBottom: 8,
      }}
    >
      <Text
        style={{
          paddingLeft: 12,
          color: colors.greydark,
          fontWeight: "500",
          opacity: 0.6,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Separator