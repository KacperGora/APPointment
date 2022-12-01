import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../colors";

const Days = ({ days, setIndex }) => {
  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <Pressable key={index} onPress={() => setIndex(index)}>
          <View style={[styles.dayContainer, day.isActive && styles.active]}>
            <Text style={styles.dayText}>{day.shortName}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
export default Days;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 12,
  },
  dayContainer: {
    backgroundColor: "#cef2fdd5",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  active: {
    backgroundColor: colors.tertiary,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  dayText: {
    fontWeight: "600",
  },
});
