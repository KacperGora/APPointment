import { View, Text, StyleSheet } from "react-native";
import React from "react";
type WarningTextProps = {
  children: string;
};
const WarningText: React.FC<WarningTextProps> = ({ children }) => {
  return (
    <View>
      <Text style={styles.warningText}>{children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  warningText: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default WarningText;
