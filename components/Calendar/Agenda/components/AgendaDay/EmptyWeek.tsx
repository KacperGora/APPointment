import React from "react";
import InformationText from "../../../../UI/InformationText/InformationText";
import { EmptyWeekContainer } from "../../style/Agenda.style";

const EmptyWeek = ({ date }) => {
  const stylingProps = {
    color: "lightgray",
    textAlign: "center",
    width: "100%",
  };
  return (
    <EmptyWeekContainer>
      <InformationText stylingProps={stylingProps}>{`${new Date(date.start)
        .toLocaleDateString()
        .slice(0, 5)} -${new Date(
        date.end
      ).toLocaleDateString()}r.`}</InformationText>
    </EmptyWeekContainer>
  );
};
export default EmptyWeek;
