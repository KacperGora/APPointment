import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const CustomerListHeading = () => {
  return (
    <View style={styles.listHeading}>
      <View style={[styles.column, { width: "45%" }]}>
        <Ionicons name="person-outline" size={24} color={colors.secondary} />
      </View>
      <View style={[styles.column, { paddingRight: 12 }]}>
        <Ionicons
          name="ios-phone-portrait-outline"
          size={24}
          color={colors.secondary}
        />
      </View>
      <View
        style={[
          styles.column,
          { width: 44, justifyContent: "flex-end", marginLeft: 30 },
        ]}
      >
        <MaterialIcons name="event-available" size={24} color="black" />
      </View>
    </View>
  );
};
export default CustomerListHeading;
const styles = StyleSheet.create({
  listHeading: {
    flexDirection: "row",
    width: Dimensions.get("screen").width - 24,
    borderBottomWidth: 0.6,
    borderBottomColor: "#f9afdfcc",
    justifyContent: "space-between",
    // padding: 12,
  },
  column: {
    // borderWidth: 1,
    // borderColor: "green",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginVertical: 12,
    marginHorizontal: 6,
  },
});
