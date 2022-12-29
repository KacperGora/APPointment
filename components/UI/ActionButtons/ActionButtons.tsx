import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../../colors";
import RegularButton from "../Buttons/RegularButton";
type ActionButtonsProps = {
  dismissButton: {
    onPress: () => void;
    title: string;
  };
  confirmButton: {
    onPress: () => void;
    title: string;
    primary?: boolean;
  };
  containerStyle?: ViewStyle;
};
const ActionButtons: React.FC<ActionButtonsProps> = ({
  dismissButton,
  confirmButton,
  containerStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      <RegularButton
        btnStyles={styles.button}
        onPress={dismissButton.onPress}
        textStyles={styles.cancelTextStyle}
        title={dismissButton.title}
      />
      <RegularButton
        btnStyles={[
          styles.button,
          confirmButton.primary && { backgroundColor: colors.primary },
        ]}
        onPress={confirmButton.onPress}
        textStyles={styles.textStyle}
        title={confirmButton.title}
        primary
      />
    </View>
  );
};
export default ActionButtons;
const styles = StyleSheet.create({
  cancelTextStyle: {
    color: "black",
  },
  button: {
    borderRadius: 12,
    // padding: 10,
    marginHorizontal: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "lightgray",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
