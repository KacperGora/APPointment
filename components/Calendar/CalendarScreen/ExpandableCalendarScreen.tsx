import React, { useState, useRef, useCallback, useContext } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  DateData,
} from "react-native-calendars";
import testIDs from "../testIds";
import { getTheme, themeColor, lightThemeColor } from "../../mocks/theme";
import { LocaleConfig } from "react-native-calendars";
import { MeetingsContext } from "../../../store/store";
import Agenda from "../Agenda/Agenda";
import { AllMeetings } from "../../../types";
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
  today: "Dziś",
};
LocaleConfig.defaultLocale = "pl";

type Navigation = {
  navigate: (
    destination: string,
    params: {
      date:
        | {
            dateString: string;
            day: number;
            month: number;
            timeStamp: number;
            year: number;
          }
        | DateData;
      items?: { title: string; data: string[] }[];
    }
  ) => void;
};
interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const { weekView } = props;
  const ctx = useContext(MeetingsContext);
  const items = ctx?.meetings;
  console.log(items);

  const [meetings, setMeetings] = useState<AllMeetings>(items);

  const navigate = useNavigation<Navigation>();

  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const onDateChanged = useCallback(() => {
    setMeetings(items);
  }, []);

  const onMonthChange = useCallback((dateString: DateData) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", dateString);
  }, []);

  const dayLongPressHandler = (date: DateData) => {
    navigate.navigate("Add", {
      date: { ...date },
    });
  };

  return (
    <CalendarProvider
      date={new Date().toDateString()}
      onDateChanged={onDateChanged}
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
          testID={testIDs.expandableCalendar.CONTAINER}
          // onDayPress={(e: DateData) => console.log(e + "asdas")}
          onDayLongPress={dayLongPressHandler}
          initialPosition={ExpandableCalendar.positions.OPEN}
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

      {/* <TimelineList
          events={meetings}
          showNowIndicator
          // scrollToNow
          scrollToFirst
          initialTime={INITIAL_TIME}
        /> */}
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
