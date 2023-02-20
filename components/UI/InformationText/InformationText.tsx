import React from "react";
import { TextContainer } from "../../shared";
import RegularText16 from "../Text/RegularText";

const InformationText = ({ children, stylingProps }) => {
  return (
    <TextContainer>
      <RegularText16 textStyles={stylingProps}>{children}</RegularText16>
    </TextContainer>
  );
};
export default InformationText;
