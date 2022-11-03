import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { colors } from "../components/colors";

import background from "../assets/wh.jpg";
import { Image, ImageBackground, View } from "react-native";
import BigText from "../components/Text/BigText";
import SmallText from "../components/Text/SmallText";
import RegularText from "../components/Text/RegularText";
import RegularButton from "../components/Buttons/RegularButton";
const WelcomeContainer = styled(Container)`
  background-color: ${colors.white};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const TopSection = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  max-height: 55%;
  padding: 50px;
  display: flex;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: "center";
`;
import { RootStackParam } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
type Props = StackScreenProps<RootStackParam, "Welcome">;
const Welcome: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <>
      <StatusBar style="light" />

      <WelcomeContainer>
        <TopSection>
          <BigText textStyles={{ width: "80%", textAlign: "right" }}>
            Just Beauty
          </BigText>
          <RegularText textStyles={{ width: "80%", textAlign: "right" }}>
            by Justyna Góra
          </RegularText>
        </TopSection>
        <RegularButton
          btnStyles={{ alignSelf: "center" }}
          textStyles={{ color: colors.white }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Rozpocznij!
        </RegularButton>
        <BottomSection>
          <BackgroundImage source={background} />
        </BottomSection>
      </WelcomeContainer>
    </>
  );
};

export default Welcome;
