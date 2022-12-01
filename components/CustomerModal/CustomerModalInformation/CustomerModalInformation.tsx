import React from "react";

import { StyleProp, Text, TextStyle, View } from "react-native";
import getClosestPastCustomerMeeting from "../../../hooks/Customer/getClosestPastCustomerMeeting";
import { Meeting, NewUserData } from "../../../types";
type ModalInformation = {
  item: NewUserData;
  style: StyleProp<TextStyle>;
};
const CustomerModalInformation: React.FC<ModalInformation> = ({
  item,
  style,
}) => {
  const closestPastMeeting: Meeting | string =
    getClosestPastCustomerMeeting(item);

  return typeof closestPastMeeting === "string" ? (
    <Text style={{ textAlign: "center", margin: 12 }}>
      {closestPastMeeting}
    </Text>
  ) : (
    <>
      <Text style={style}>{item.fullName}</Text>
      <Text>{`Ostatnia wizyta: ${new Date(
        closestPastMeeting.start
      ).toLocaleString()}`}</Text>
      <Text style={style}>Wykonano {closestPastMeeting.serviceName}</Text>
    </>
  );
};
export default CustomerModalInformation;
