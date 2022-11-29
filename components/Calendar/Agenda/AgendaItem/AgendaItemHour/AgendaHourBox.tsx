import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../colors";

const AgendaHourBox = ({ item }) => {
  return (
    <View style={styles.hoursBox}>
      <Feather name="clock" size={20} color="#c7c7c7" />
      <View style={{ padding: 6 }}>
        <Text style={styles.itemHourText}>{`${
          item.startHourStr
        } ${item.endHour.slice(0, 5)}`}</Text>

        <Text style={styles.itemDurationText}>
          {item.serviceDuration} minut
        </Text>
      </View>
    </View>
  );
};
export default AgendaHourBox;
const styles = StyleSheet.create({
  hoursBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemHourText: {
    color: colors.greydark,
    fontSize: 12,
    fontWeight: "600",
  },
  itemDurationText: {
    color: "#726f6f",
    fontSize: 10,
  },
});
