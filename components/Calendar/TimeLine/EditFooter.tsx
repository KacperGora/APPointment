import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { colors } from "../../colors";

const EditFooter = ({ onPressCancel, onPressSubmit }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={onPressCancel}>
        <Text style={styles.btnText}>Anuluj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressSubmit}>
        <Text style={styles.btnText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
};
export default EditFooter;
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    height: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    borderRadius: 6,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: { fontSize: 16, color: "#FFF", fontWeight: "bold" },
});
