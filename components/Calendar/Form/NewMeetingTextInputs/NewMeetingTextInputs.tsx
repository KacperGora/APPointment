import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../../../colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
type InputProps = {
  setUserTypedName: any;
  setUserTypedLastName: any;
  setShowCustomerName: any;
  fullName: string;
};
const TextInputs: React.FC<InputProps> = ({
  setUserTypedName,
  setUserTypedLastName,
  setShowCustomerName,
  fullName,
}) => {
  const firstName = fullName.split(" ")[0].trim();
  const lastName = fullName.split(" ")[1].trim();

  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={24} color={colors.primary} />
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Imię"
        autoCorrect={true}
        onChangeText={setUserTypedName}
        value={firstName}
        placeholderTextColor="#9d9d9d"
      />
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Nazwisko"
        onChangeText={setUserTypedLastName}
        value={lastName}
        placeholderTextColor="#9d9d9d"
        onBlur={() => setShowCustomerName(true)}
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
