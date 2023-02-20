import React from "react";
import {
  CardHeadingContainer,
  RowContainerSpaceBetween,
} from "../../shared";
import RegularText16 from "../../UI/Text/RegularText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../types";
const CardHeader = ({ item }) => {
  const navigation = useNavigation<Navigation>();
  return (
    <RowContainerSpaceBetween>
      <CardHeadingContainer>
        <RegularText16>{item.title}</RegularText16>
      </CardHeadingContainer>
      <Ionicons
        name={item.iconName}
        size={24}
        color="#ec368e92"
        onPress={() => navigation.navigate(item.navDestination)}
      />
    </RowContainerSpaceBetween>
  );
};
export default CardHeader;
