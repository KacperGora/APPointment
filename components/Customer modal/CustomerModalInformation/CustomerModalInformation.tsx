import dayjs from "dayjs";
import React, { useMemo } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createGlobalStyle } from "styled-components";
import getClosestPastCustomerMeeting from "../../../hooks/Customer/getClosestPastCustomerMeeting";
import { NewUserData } from "../../../types";
import { phoneNumberFormatter } from "../../../Utils/formatUtilis";
import { colors } from "../../colors";
import { RowContainer } from "../../shared";
import PhoneLink from "../../UI/Text/PhoneLink";
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
    typeof closestPastMeeting === undefined
      ? null
      : dayjs(closestPastMeeting?.start).format("DD MMM YYYY HH:mm");

  const modalInformationConfig: {
    id: number;
    style: TextStyle;
    heading: boolean;
    value: string;
    placeHolder: string;
  }[] = [
    {
      id: 1,
      style: { marginBottom: 15, textAlign: "center" },
      heading: true,
      value: item.fullName,
      placeHolder: "",
    },
    {
      id: 2,
      style: { fontWeight: "600", color: colors.greydark },
      heading: false,
      value: item.phoneNumber,
      placeHolder: "Numer telefonu: ",
    },
    {
      id: 3,
      style: { textAlign: "left" },
      heading: false,
      value: formattedDate,
      placeHolder: "Ostatnia wizyta: ",
    },
    {
      id: 4,
      style: { marginVertical: 12, textAlign: "left" },
      heading: false,
      value: closestPastMeeting?.serviceName,
      placeHolder: "Usługa: ",
    },
    {
      id: 5,
      style: { marginVertical: 12, textAlign: "left" },
      heading: false,
      value: item?.additionalInfo,
      placeHolder: "Uwagi: ",
    },
  ];

  return (
    <View style={{ justifyContent: "flex-start" }}>
      {modalInformationConfig.map((el) => {
        return el.heading ? (
          <RegularText16 key={el.id} textStyles={el.style}>
            {el.value}
          </RegularText16>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <SmallText textStyles={[el.style, { fontWeight: "600" }]}>
              {el.placeHolder}
            </SmallText>
            {el.placeHolder !== "Numer telefonu: " ? (
              <SmallText key={el.id} textStyles={el.style}>
                {el.value}
              </SmallText>
            ) : (
              <PhoneLink phoneNumber={phoneNumberFormatter(el.value)} />
            )}
          </View>
        );
      })}
    </View>
  );
};
export default CustomerModalInformation;
