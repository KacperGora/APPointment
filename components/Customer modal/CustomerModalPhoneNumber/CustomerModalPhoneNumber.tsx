import React from "react";
import { Linking, Text } from "react-native";
import { phoneNumberFormatter } from "../../../Utils/formatUtilis";
import PhoneLink from "../../UI/Text/PhoneLink";
import SmallText from "../../UI/Text/SmallText";

const CustomerModalPhoneNumber = ({ style, phoneNumber }) => {
  const formattedPhoneNumber = phoneNumberFormatter(phoneNumber);
  return (
    <SmallText textStyles={{ alignSelf: "flex-start" }}>
      Numer telefonu:
      <PhoneLink style={{}} phoneNumber={formattedPhoneNumber} />
    </SmallText>
  );
};
export default CustomerModalPhoneNumber;
