import React, { useMemo } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import getClosestPastCustomerMeeting from "../../../hooks/Customer/getClosestPastCustomerMeeting";
import { NewUserData } from "../../../types";
import RegularText16 from "../../UI/Text/RegularText";
import SmallText from "../../UI/Text/SmallText";
type ModalInformation = {
  item: NewUserData;
  style: StyleProp<TextStyle>;
};
const CustomerModalInformation: React.FC<ModalInformation> = ({ item }) => {
  const closestPastMeeting = useMemo(
    () => getClosestPastCustomerMeeting(item),
    [item]
  );

  const formattedDate =
    typeof closestPastMeeting === "string"
      ? null
      : new Date(closestPastMeeting.start).toLocaleString().slice(0, 17);

  return typeof closestPastMeeting === "string" ? (
    <RegularText16 textStyles={{ textAlign: "center", margin: 12 }}>
      {closestPastMeeting}
    </RegularText16>
  ) : (
    <View style={{ justifyContent: "flex-start" }}>
      <RegularText16 textStyles={{ marginBottom: 15, textAlign: "center" }}>
        {item.fullName}
      </RegularText16>
      <SmallText textStyles={{ textAlign: "left" }}>
        Ostatnia wizyta: {formattedDate}
      </SmallText>
      <SmallText textStyles={{ marginVertical: 12, textAlign: "left" }}>
        Usługa: {closestPastMeeting.serviceName}
      </SmallText>
    </View>
  );
};
export default CustomerModalInformation;
