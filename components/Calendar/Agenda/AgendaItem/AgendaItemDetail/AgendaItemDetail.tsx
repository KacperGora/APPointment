import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AgendaItemDetail = ({ item }) => {
  return (
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <Text style={styles.itemDetailText}>{item.serviceName}</Text>
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
