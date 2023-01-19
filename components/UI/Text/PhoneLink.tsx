import React from "react";
import { Linking, Text } from "react-native";

const PhoneLink = ({ phoneNumber, style }) => {
  return (
    <Text
      style={style}
      onPress={() => {
        Linking.openURL(`tel:${phoneNumber}`);
      }}
    >
      {`${phoneNumber}`}
    </Text>
  );
};
export default PhoneLink;
