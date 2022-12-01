import React from "react";
import { Linking, Text } from "react-native";
import phoneNumberFormatter from "../../../Utils/phoneNumberFormatter";

const CustomerModalPhoneNumber = ({ style, phoneNumber }) => {
  const formattedPhoneNumber = phoneNumberFormatter(phoneNumber);
  return (
    <Text style={style}>
      Numer telefonu:
      <Text
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber}`);
        }}
      >
        {` ${formattedPhoneNumber}`}
      </Text>
    </Text>
  );
};
export default CustomerModalPhoneNumber;
