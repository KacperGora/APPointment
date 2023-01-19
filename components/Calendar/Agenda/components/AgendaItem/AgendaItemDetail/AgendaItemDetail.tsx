import React from "react";
import { Text, View } from "react-native";
import { AgendaItemProps } from "../../../../../../types";
import { getAgendaItemDetails } from "../../../config/agendaDayConfig";

const AgendaItemDetail: React.FC<AgendaItemProps> = ({ item }) => {
  const singleItem = getAgendaItemDetails(item);
  return (
    <View
      style={{
        justifyContent: "center",
        width: 160,
      }}
    >
      {singleItem.map((item) => (
        <Text key={item.id} style={item.style}>
          {item.value}
        </Text>
      ))}
    </View>
  );
};
export default AgendaItemDetail;
