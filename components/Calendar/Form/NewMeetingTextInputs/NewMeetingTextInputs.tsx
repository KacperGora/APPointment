import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../../../colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
type InputProps = {
  setUserTypedName: any;
  setUserTypedLastName: any;
};
const TextInputs: React.FC<InputProps> = ({
  setUserTypedName,
  setUserTypedLastName,
}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={24} color={colors.primary} />
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Imię"
        autoCorrect={true}
        onChangeText={setUserTypedName}
        placeholderTextColor="#9d9d9d"
      />
      <TextInput
        autoCapitalize="characters"
        style={styles.input}
        placeholder="Nazwisko"
        onChangeText={setUserTypedLastName}
        placeholderTextColor="#9d9d9d"
      />
    </View>
  );
};

export default TextInputs;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.3,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,

    textAlign: "center",
    borderRadius: 5,
    width: "40%",
  },
});
