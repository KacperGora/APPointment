import React, { useRef, useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  DateData,
  CalendarUtils,
} from "react-native-calendars";
import testIDs from "../testIds";
import { getTheme, themeColor, lightThemeColor } from "../../mocks/theme";
import { LocaleConfig } from "react-native-calendars";
import Agenda from "../Agenda/Agenda";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { groupBy } from "lodash";

LocaleConfig.locales["pl"] = {
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
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ],
  dayNamesShort: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
  // @ts-ignore: Unreachable code error
  today: "Dziś",
};
LocaleConfig.defaultLocale = "pl";

type Navigation = {
  navigate: (
    destination: string,
    params: {
      date: string;
      items?: { title: string; data: string[] }[];
    }
  ) => void;
};
interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const { weekView } = props;
  const navigate = useNavigation<Navigation>();
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const onMonthChange = useCallback((dateString: DateData) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", dateString);
  }, []);

  const dayLongPressHandler = (date: DateData) => {
    navigate.navigate("Add", {
      date: date.dateString,
    });
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  // useEffect(() => {
  //   const meetingsByDate = groupBy(nar, (e) =>
  //     CalendarUtils.getCalendarDateString(e.startDayStr)
  //   );

  //   console.log(meetingsByDate);
  // }, []);
  return (
    // @ts-ignore: Unreachable code error
    <CalendarProvider
      date={new Date().toDateString()}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.5}
      numberOfDays={1}
      theme={todayBtnTheme.current}
    >
      {weekView ? (
        <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} />
      ) : (
        <ExpandableCalendar
          initialDate={new Date().toDateString()}
          // @ts-ignore: Unreachable code error
          initialPosition={ExpandableCalendar.positions.OPEN}
          onDayLongPress={dayLongPressHandler}
          calendarStyle={styles.calendar}
          theme={theme.current}
          disableAllTouchEventsForDisabledDays
          firstDay={0}
          animateScroll
          closeOnDayPress={true}
          disabledDaysIndexes={[6]}
        />
      )}
      <Agenda />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
});
