import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FunctionComponent } from "react";
interface ButtonProps {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
}
const CustomButton: FunctionComponent<ButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Text>{children}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonContainer: {},
  pressed: {
    opacity: 0.7,
  },
});
