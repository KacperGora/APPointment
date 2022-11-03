import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../colors";
import RegularText from "../Text/RegularText";

interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  children: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
}

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.primary};
  width: 50%;
  padding: 20px;
  border-radius: 20px;
`;
const RegularButton: FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <RegularText textStyles={props.textStyles}>{props.children}</RegularText>
    </ButtonView>
  );
};

export default RegularButton;
