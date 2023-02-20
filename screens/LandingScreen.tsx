import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { Container, ScreenWidth } from "../components/shared";
import { colors } from "../components/colors";
import background from "../assets/wh.jpg";
import RegularButton from "../components/UI/Buttons/RegularButton";
import { RootStackParam } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import BigText from "../components/UI/Text/BigText";
import RegularText from "../components/UI/Text/RegularText";
import MyStatusBar from "../components/UI/StatusBar/MyStatusBar";
type Props = StackScreenProps<RootStackParam, "Welcome">;
const LandingScreen: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <MyStatusBar>
      <WelcomeContainer>
        <TopSection>
          <BigText>Just Beauty</BigText>
          <RegularText>by Justyna Góra</RegularText>
        </TopSection>
        <RegularButton
          btnStyles={{
            shadowColor: colors.greydark,
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            marginVertical: 12,
            elevation: 10,
          }}
          textStyles={{ color: colors.white }}
          onPress={() => {
            navigation.navigate("Home");
          }}
          title="Rozpocznij"
          primary
        />
        <BottomSection>
          <BackgroundImage source={background} />
        </BottomSection>
      </WelcomeContainer>
    </MyStatusBar>
  );
};

export default LandingScreen;

const WelcomeContainer = styled(Container)`
  background-color: ${colors.white};
  justify-content: space-between;
`;
const TopSection = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 50px;
`;

const BottomSection = styled.View`
  width: 120%;
  flex: 1;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
`;
