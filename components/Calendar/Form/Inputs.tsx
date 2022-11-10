import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../../colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
type InputProps = {
  setUserTypedName: any;
  setUserTypedLastName: any;
};
const Inputs: React.FC<InputProps> = ({
  setUserTypedName,
  setUserTypedLastName,
}) => {
  return (
    <View style={styles.inputBox}>
      <MaterialIcons name="account-circle" size={24} color={colors.primary} />
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Imię"
        autoCorrect={true}
        onChangeText={setUserTypedName}
      />
      <TextInput
        autoCapitalize="characters"
        style={styles.input}
        placeholder="Nazwisko"
        onChangeText={setUserTypedLastName}
      />
    </View>
  );
};

export default Inputs;
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    padding: 8,
    margin: 8,
    textAlign: "center",
    borderRadius: 5,
    width: "40%",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
