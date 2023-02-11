import dayjs from "dayjs";
import React, { useMemo } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createGlobalStyle } from "styled-components";
import getClosestPastCustomerMeeting from "../../../hooks/Customer/getClosestPastCustomerMeeting";
import { NewUserData } from "../../../types";
import { phoneNumberFormatter } from "../../../Utils/formatUtilis";
import { colors } from "../../colors";
import { RowContainer, ScreenWidth } from "../../shared";
import PhoneLink from "../../UI/Text/PhoneLink";
import RegularText16 from "../../UI/Text/RegularText";
import SmallText from "../../UI/Text/SmallText";
import { Ionicons } from "@expo/vector-icons";
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
    placeHolder: any;
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
      placeHolder: (
        <Ionicons
          name="md-phone-portrait-sharp"
          size={24}
          color={colors.primary}
        />
      ),
    },
    {
      id: 3,
      style: { textAlign: "left" },
      heading: false,
      value: formattedDate,
      placeHolder: (
        <Ionicons
          name="ios-calendar-outline"
          size={24}
          color={colors.primary}
        />
      ),
    },
    {
      id: 4,
      style: { marginVertical: 12, textAlign: "left" },
      heading: false,
      value: closestPastMeeting?.serviceName,
      placeHolder: (
        <Ionicons name="ios-brush-outline" size={24} color={colors.primary} />
      ),
    },
    {
      id: 5,
      style: { marginVertical: 12, textAlign: "left" },
      heading: false,
      value: item?.additionalInfo,
      placeHolder: (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={colors.primary}
        />
      ),
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
          <View
            key={el.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SmallText textStyles={[el.style, { fontWeight: "600" }]}>
              {el.placeHolder}
            </SmallText>
            {el.placeHolder !== "Numer telefonu: " ? (
              <SmallText
                key={el.id}
                textStyles={[el.style, { width: ScreenWidth / 2 }]}
              >
                {el.value}
              </SmallText>
            ) : (
              <PhoneLink
                style={{}}
                phoneNumber={phoneNumberFormatter(el.value)}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
export default CustomerModalInformation;
