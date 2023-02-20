import { Platform } from "react-native";
import { Theme } from "react-native-calendars/src/types";
import { colors } from "../../../colors";

export const themeColor = "#B8336A";
export const lightThemeColor = "#f2f7f7";

export function getCalendarListTheme(): Theme {
  const disabledColor = "#EDE6F2";
  return {
    arrowColor: "lightgray",
    arrowStyle: { padding: 0 },
    monthTextColor: "gray",
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as "bold",
    textSectionTitleColor: "black",
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as "normal",
    dayTextColor: colors.greydark,
    agendaTodayColor: "black",
    textDayFontSize: 18,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as "500",
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    textDisabledColor: disabledColor,
    agendaKnobColor: "#ef549f7a",
    selectedDayBackgroundColor: "transparent",
    selectedDayTextColor: colors.greydark,
    dotColor: themeColor,
    selectedDotColor: "white",
    disabledDotColor: disabledColor,
    dotStyle: { marginBottom: 2 },
  };
}

export function getTimelineTheme() {
  return {
    dragHourColor: "#001253",
    todayName: { color: "black" },
    nowIndicatorColor: colors.primary,
    unavailableBackgroundColor: "lightgray",
    todayNumberContainer: { backgroundColor: colors.primary },
    eventTitle: { fontSize: 12 },
    saturdayName: { color: "red" },
    saturdayNumber: { color: "red" },
    saturdayNumberContainer: { backgroundColor: "white" },
    dayName: { color: "black" },
    dayNumber: { color: "black" },
    dayNumberContainer: { backgroundColor: "white" },
  };
}
