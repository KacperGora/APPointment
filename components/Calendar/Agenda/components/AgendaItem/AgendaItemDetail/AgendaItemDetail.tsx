import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Meeting } from "../../../../../../types";
type Props = {
  item: Meeting;
};
const AgendaItemDetail: React.FC<Props> = ({ item }) => {
  const title = item.title;
  const serviceName = item.serviceName;

  return (
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitleText}>{title}</Text>
      <Text style={styles.itemDetailText}>{serviceName}</Text>
    </View>
  );
};
export default AgendaItemDetail;
const styles = StyleSheet.create({
  itemDetailText: {
    fontSize: 10,
    color: "#726f6f",
  },
  itemDetails: {
    justifyContent: "center",
    width: 160,
  },
  itemTitleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
