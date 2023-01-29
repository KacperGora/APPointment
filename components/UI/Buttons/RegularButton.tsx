import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../colors";
import RegularText from "../Text/RegularText";

interface ButtonProps {
  btnStyles?: ViewStyle;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  primary?: boolean;
  textStyles?: TextStyle;
  disabled?: boolean;
  title: string;
}

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  padding: 12px 24px 12px 24px;
  border-radius: 20px;
`;
const RegularButton: FunctionComponent<ButtonProps> = ({
  onPress,
  btnStyles,
  textStyles,
  disabled,
  title,
  primary,
}) => {
  return (
    <ButtonView
      disabled={disabled}
      onPress={onPress}
      style={[
        btnStyles,
        primary && { backgroundColor: colors.primary },
        disabled && { backgroundColor: "#db95b7" },
      ]}
    >
      <RegularText textStyles={textStyles}>{title}</RegularText>
    </ButtonView>
  );
};

export default RegularButton;
