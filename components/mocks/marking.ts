import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { DotProps } from "react-native-calendars/src/calendar/day/dot";
import { MarkingTypes, Theme } from "./types";

export enum Markings {
  DOT = "dot",
  MULTI_DOT = "multi-dot",
  PERIOD = "period",
  MULTI_PERIOD = "multi-period",
  CUSTOM = "custom",
}

type CustomStyle = {
  container?: ViewStyle;
  text?: TextStyle;
};

type DOT = {
  key?: string;
  color: string;
  selectedDotColor?: string;
};

type PERIOD = {
  color: string;
  startingDay?: boolean;
  endingDay?: boolean;
};

export interface MarkingProps extends DotProps {
  type?: MarkingTypes;
  theme?: Theme;
  selected?: boolean;
  marked?: boolean;
  today?: boolean;
  disabled?: boolean;
  inactive?: boolean;
  disableTouchEvent?: boolean;
  activeOpacity?: number;
  textColor?: string;
  selectedColor?: string;
  selectedTextColor?: string;
  customTextStyle?: StyleProp<TextStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  dotColor?: string;
  //multi-dot
  dots?: DOT[];
  //multi-period
  periods?: PERIOD[];
  startingDay?: boolean;
  endingDay?: boolean;
  accessibilityLabel?: string;
  customStyles?: CustomStyle;
}
