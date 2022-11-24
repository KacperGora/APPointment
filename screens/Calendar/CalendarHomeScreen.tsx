import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import { Container } from "../../components/shared";
import { colors } from "../../components/colors";
import ExpandableCalendarScreen from "../../components/Calendar/CalendarScreen/ExpandableCalendarScreen";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;
const CalendarScreen: FunctionComponent = () => {
  return (
    <HomeContainer>
      <StatusBar style="dark" />
      <ExpandableCalendarScreen />
    </HomeContainer>
  );
};

export default CalendarScreen;
