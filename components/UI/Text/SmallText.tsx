import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import { TextStyle } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const StyledText = styled.Text`
  font-size: 14px;
  color: ${colors.greydark};
  text-align: left;
  font-family: Lato-Regular;
`;
type TextProps = {
  children: ReactNode;
  textStyles?: TextStyle;
};
const SmallText: React.FC<TextProps> = ({ textStyles, children }) => {
  return <StyledText style={textStyles}>{children}</StyledText>;
};

export default SmallText;
