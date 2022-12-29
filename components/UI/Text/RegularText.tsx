import React, { FunctionComponent, ReactNode } from "react";
import { TextStyle } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const StyledText = styled.Text`
  font-size: 16px;
  color: ${colors.greydark};
  text-align: left;
  font-family: Lato-Bold;
`;
type Props = {
  children: ReactNode;
  textStyles?: TextStyle;
};
const RegularText16: React.FC<Props> = ({ textStyles, children }) => {
  return <StyledText style={textStyles}>{children}</StyledText>;
};

export default RegularText16;
