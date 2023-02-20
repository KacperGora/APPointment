import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";

const StyledText = styled.Text`
  font-size: 24px;
  color: ${colors.greydark};
  text-align: left;
  font-family: Lato-Bold;
  font-weight: 600;
`;

const RegularText24 = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};

export default RegularText24;
