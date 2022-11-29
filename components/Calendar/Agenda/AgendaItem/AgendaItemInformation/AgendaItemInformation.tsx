import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const AgendaItemInformation = ({ item }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ionicons
        name="md-information-circle-outline"
        size={24}
        color="#ec368e9d"
      />
      <Text style={styles.workerText}>{item.worker}</Text>
    </View>
  );
};

export default AgendaItemInformation;
const styles = StyleSheet.create({
  workerText: {
    fontSize: 10,
    textAlign: "center",
    color: "#acacac",
  },
});
