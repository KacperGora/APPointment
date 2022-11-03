import React, { FunctionComponent } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";
import SmallText from "../Text/SmallText";
import RegularText from "../Text/RegularText";
import { colors } from "../colors";
interface GreetingProps {
  mainText: string;
  subText: string;
  mainTextStyles?: StyleProp<TextStyle>;
  subTextStyles?: StyleProp<TextStyle>;
}
const StyledView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
const Greeting: FunctionComponent<GreetingProps> = (props) => {
  return (
    <StyledView>
      <RegularText
        textStyles={[
          { color: colors.secondary, fontSize: 22 },
          props.mainTextStyles,
        ]}
      >
        {props.mainText}
      </RegularText>
      <RegularText
        textStyles={[{ color: colors.greydark }, props.subTextStyles]}
      >
        {props.subText}
      </RegularText>
    </StyledView>
  );
};
export default Greeting;
