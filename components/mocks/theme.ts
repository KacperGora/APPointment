import { Platform } from "react-native";

export const themeColor = "#B8336A";
export const lightThemeColor = "#f2f7f7";

export function getTheme() {
  const disabledColor = "#EDE6F2";

  return {
    // arrows
    arrowColor: "black",
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: themeColor,
    // month
    monthTextColor: "black",
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as "bold",
    // day names
    textSectionTitleColor: "black",
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as "normal",
    // dates
    dayTextColor: "grey",
    todayTextColor: "#af0078",
    textDayFontSize: 18,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as "500",
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: "white",
    // disabled date
    textDisabledColor: disabledColor,

    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: "white",
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 },
  };
}
