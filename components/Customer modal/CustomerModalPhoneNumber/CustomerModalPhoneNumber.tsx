import React from "react";
import { Linking, Text } from "react-native";
import { phoneNumberFormatter } from "../../../Utils/formatUtilis";
import SmallText from "../../UI/Text/SmallText";

const CustomerModalPhoneNumber = ({ style, phoneNumber }) => {
  const formattedPhoneNumber = phoneNumberFormatter(phoneNumber);
  return (
    <SmallText textStyles={{ alignSelf: "flex-start" }}>
      Numer telefonu:
      <Text
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber}`);
        }}
      >
        {` ${formattedPhoneNumber}`}
      </Text>
    </SmallText>
  );
};
export default CustomerModalPhoneNumber;
