import styled from "styled-components/native";
import { colors } from "../../../colors";

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 0px 6px;
  margin: 0 12px;
`;
export const StyledInput = styled.TextInput`
  border-color: #ccc;
  padding: 8px;
  border-width: 0.3x;
  text-align: center;
  border-radius: 8px;
  flex: 1;
  margin: 12px 12px;
`;

export const StyledScrollView = styled.ScrollView`
  border-bottom-color: lightgray;
  border-bottom-width: 0.3px;
  padding: 12px 6px;
`;
export const StyledPressable = styled.Pressable`
  border-radius: 10px;
  padding: 8px 16px;
  margin: 4px;
  border-color: ${colors.greydark};
  border-width: 0.3px;
`;
export const ModalContainer = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.graylight};
  padding: 35px;
  align-items: center;
`;
export const ModalCentredViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #1a1a1a56;
`;
export const SummaryViewContainer = styled.View`
  border-width: 1px;
  border-color: ${colors.gray};
  border-radius: 12px;
  padding: 24px 12px;
  margin: 12px;
  background-color: white;
  flex: 1;
`;
