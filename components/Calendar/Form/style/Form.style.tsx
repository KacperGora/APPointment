import styled from "styled-components/native";
import { colors } from "../../../colors";

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 6px;
  border-bottom-width: 0.3px;
  border-bottom-color: #ccc;
`;
export const StyledInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 8px;
  text-align: center;
  border-radius: 5px;
  width: 40%;
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
export const SummaryViewContainer= styled.View`
  border-width: 1px;
  border-color: ${colors.gray};
  border-radius: 12px;
  margin: 24px 12px;
  padding: 12px;
  background-color: white;

`