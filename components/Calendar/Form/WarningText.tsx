import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../colors";

const WarningText: React.FC = () => {
  return (
    <View style={{ marginHorizontal: 16 }}>
      <Text style={styles.warningText}>
        Termin zajety, wybierz proszę inny.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  warningText: {
    color: colors.primary,
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default WarningText;
