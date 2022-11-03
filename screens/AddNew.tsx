import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import { Container } from "../components/shared";
import { colors } from "../components/colors";
import ExpandableCalendarScreen from "../components/Calendar/ExpandableCalendarScreen";
import TimelineCalendarScreen from "../components/Calendar/TimeLineCalendarScreen";
import AddNewForm from "../components/Calendar/Form/AddNewForm";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;
const AddNew: FunctionComponent = ({ navigation, route }) => {
  const date = route.params;

  return (
    <HomeContainer>
      <StatusBar style="auto" />
      <AddNewForm date={date.dateString} />
    </HomeContainer>
  );
};

export default AddNew;
