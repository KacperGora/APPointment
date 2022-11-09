import React from "react";
import ReactNative from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Button } from "react-native";
import CustomButton from "../../UI/CustomButton";
type Navigation = {
  navigate: (destination: string) => void;
};
type ButtonBoxProps = {
  onPress: any;
  disabled: boolean;
};
const ButtonBox: React.FC<ButtonBoxProps> = ({ onPress, disabled }) => {
  const navigate = useNavigation<Navigation>();
  return (
    <View style={styles.actionsContainer}>
      <View style={styles.singleButton}>
        <CustomButton secondary onPress={() => navigate.navigate("Home")}>
          Anuluj
        </CustomButton>
      </View>
      <View style={styles.singleButton}>
        <CustomButton onPress={onPress} disabled={disabled}>
          Dodaj
        </CustomButton>
      </View>
    </View>
  );
};

export default ButtonBox;
const styles = StyleSheet.create({
  singleButton: {
    marginHorizontal: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 6,
  },
});
