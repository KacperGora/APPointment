import styled from "styled-components/native";
import { ScreenWidth } from "../../shared";
export const ModalHeaderContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
  padding: 12px 0px;
  margin: 12px 0px;
`;
export const Container = styled.View`
  margin: 12px 0px;
  border-bottom-width: 0.3px;
  border-bottom-color: lightgray;
  padding-bottom: 6px;
`;
export const LineContainer = styled.View`
  padding: 0px 12px;
  margin: 0px 12px;
  width: ${ScreenWidth / 2}px;
  flex-direction: row;
  align-items: center;
  background-color: ffc2592;
  justify-content: flex-start;
`;
export const ModalContentContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
`;
