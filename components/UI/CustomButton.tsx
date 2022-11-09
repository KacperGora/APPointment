import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FunctionComponent } from "react";
import { colors } from "../colors";
interface ButtonProps {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
  secondary?: boolean;
}
const CustomButton: FunctionComponent<ButtonProps> = ({
  children,
  onPress,
  secondary,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        secondary && {
          backgroundColor: "white",
          borderColor: colors.primary,
          borderWidth: 1,
        },
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Text style={[styles.text, secondary && { color: "black" }]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    width: 100,
    height: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
