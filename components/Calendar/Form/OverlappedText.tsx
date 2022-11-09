import { View, Text, StyleSheet } from "react-native";
import React from "react";
function OverlappedText() {
  return (
    <View>
      <Text style={styles.warningText}>
        Termin zajety, wybierz proszę inny.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  warningText: {
    color: "red",
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default OverlappedText;
