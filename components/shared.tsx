import styled from "styled-components/native";
import { colors } from "./colors";
import { Dimensions } from "react-native";

export const Container = styled.View`
  flex: 1;
  margin-top: 24px;
  align-items: center;
  background-color: ${colors.white};
`;
export const TextContainer = styled.View`
  flex: 1;
  justify-items: baseline;
  margin: 24px 12px
  /* justify-content: center; */
  /* padding: 0px 12px 24px 24px; */
`;
export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const RowContainerSpaceBetween = styled(RowContainer)`
  justify-content: space-between;
`;
export const StyledViewBorder = styled.View`
  flex: 1;
  background-color: white;
  border-color: lightgray;
  border-width: 1px;
`;
//card
export const CardIncomingsDot = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
export const CardHeadingContainer = styled.View`
  border-color: ${colors.accent};
  border-width: 1px;
  border-radius: 16px;
  background-color: #fbcd7761;
  padding: 6px 12px;
`;

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const getCalendarLocale = () => {
  return {
    monthNames: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    monthNamesShort: [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paź",
      "Lis",
      "Gru",
    ],
    dayNames: [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
      ,
    ],
    dayNamesShort: ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sb"],
    // @ts-ignore: Unreachable code error
    today: "Dziś",
  };
};
export const shadowStyle = {
  shadowColor: "lightgray",
  shadowOffset: { width: 2, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
};
