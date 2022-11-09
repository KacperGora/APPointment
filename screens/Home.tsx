import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import { Container } from "../components/shared";
import { colors } from "../components/colors";
import ExpandableCalendarScreen from "../components/Calendar/ExpandableCalendarScreen";
import TimelineCalendarScreen from "../components/Calendar/TimeLineCalendarScreen";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;
const Home: FunctionComponent = () => {
  return (
    <HomeContainer>
      <StatusBar style="auto" />
      {/* <TimelineCalendarScreen /> */}
      <ExpandableCalendarScreen />
    </HomeContainer>
  );
};

export default Home;
