import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import { Container } from "../components/shared";
import { colors } from "../components/colors";
import ExpandableCalendarScreen from "../components/Calendar/CalendarScreen/ExpandableCalendarScreen";
import TimelineCalendarScreen from "../components/Calendar/TimeLine/TimelineList";
import TimelineScreen from "../components/Calendar/TimeLine/TimelineScreen";
import SalonMain from "./Salon/SalonMain";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;
const Home: FunctionComponent = () => {
  return (
    <HomeContainer>
      <StatusBar style="auto" />
      <HomeContainer>
        <ExpandableCalendarScreen />
      </HomeContainer>
    </HomeContainer>
  );
};

export default Home;
