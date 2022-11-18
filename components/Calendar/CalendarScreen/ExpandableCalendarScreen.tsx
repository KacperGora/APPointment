import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
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

import { LocaleConfig } from "react-native-calendars";
import Agenda from "../Agenda/Agenda";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { groupBy } from "lodash";
import { getTheme, themeColor, lightThemeColor } from "./calendarThemes";
import { MeetingsContext } from "../../../store/store";

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
  const ctx = useContext(MeetingsContext);
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

  useEffect(() => {
    const controller = new AbortController();
    const fetchedMeetings = [];
    const getData = async () => {
      const q = query(collection(db, "meetings"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (const [key, value] of Object.entries(doc.data())) {
            fetchedMeetings[doc.id] = [...value];
          }
        });
        ctx.fetchMeetings(fetchedMeetings);
      });
    };
    getData();
    return () => controller.abort();
  }, []);

  return (
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
          initialPosition={ExpandableCalendar.positions.OPEN}
          onDayLongPress={dayLongPressHandler}
          calendarStyle={styles.calendar}
          theme={theme.current}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
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
