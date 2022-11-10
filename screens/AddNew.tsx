import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import AddNewForm from "../components/Calendar/Form/AddNewForm";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;
const AddNew: FunctionComponent = () => {
  return (
    <HomeContainer>
      <StatusBar style="auto" />
      <AddNewForm />
    </HomeContainer>
  );
};

export default AddNew;
