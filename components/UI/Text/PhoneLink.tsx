import React from "react";
import { Linking, Text } from "react-native";
import { phoneNumberFormatter } from "../../../Utils/formatUtilis";

const PhoneLink = ({ phoneNumber, style }) => {
  return (
    <Text
      style={style}
      onPress={() => {
        Linking.openURL(`tel:${phoneNumber}`);
      }}
    >
      {phoneNumberFormatter(phoneNumber)}
    </Text>
  );
};
export default PhoneLink;
