import React, { useMemo } from "react";
import { View } from "react-native";
import { ModalInformation } from "../../../types";
import PhoneLink from "../../UI/Text/PhoneLink";
import RegularText16 from "../../UI/Text/RegularText";
import SmallText from "../../UI/Text/SmallText";
import { RowContainer } from "../../shared";
import RegularText24 from "../../UI/Text/RegularText24";
import {
  Container,
  LineContainer,
  ModalHeaderContainer,
} from "../style/Modal.style";
import { getModalConfig } from "../ModalConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

const CustomerModalInformation: React.FC<ModalInformation> = ({
  item,
  onPress,
}) => {
  const detailsConfig = useMemo(() => {
    return getModalConfig(item);
  }, []);

  return (
    <View style={{ width: "100%", marginBottom: 12 }}>
      <View
        style={{
          marginHorizontal: 12,
        }}
      >
        <ModalHeaderContainer>
          <RegularText24>{item.fullName}</RegularText24>
          <PhoneLink style={{ marginLeft: 4 }} phoneNumber={item.phoneNumber} />
        </ModalHeaderContainer>
      </View>
      {detailsConfig.map((el) => {
        return (
          <Container key={el.id}>
            <LineContainer>
              {el.icon}
              <RegularText16>{el.title}</RegularText16>
            </LineContainer>
            <RowContainer
              style={{
                marginHorizontal: 24,
                marginVertical: 6,
              }}
            >
              {el.navigate ? (
                <TouchableOpacity
                  onPress={() => onPress(el.navigate, el.closestMeeting)}
                >
                  <SmallText textStyles={{ textAlign: "justify" }}>
                    {el.value} {el.date}
                  </SmallText>
                </TouchableOpacity>
              ) : (
                <SmallText textStyles={{ textAlign: "justify" }}>
                  {el.value} {el.date}
                </SmallText>
              )}
            </RowContainer>
          </Container>
        );
      })}
    </View>
  );
};
export default CustomerModalInformation;
