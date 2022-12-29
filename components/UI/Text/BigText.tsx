import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";

const StyledText = styled.Text`
  font-size: 36px;
  color: ${colors.greydark};
  text-align: left;
  font-family: Lato-Bold;
`;

const BigText36 = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};

export default BigText36;
