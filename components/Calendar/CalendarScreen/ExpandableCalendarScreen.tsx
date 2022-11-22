import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ExpandableCalendar,
  CalendarProvider,
  DateData,
} from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import Agenda from "../Agenda/Agenda";
import { getTheme, themeColor, lightThemeColor } from "./calendarThemes";
import { MeetingsContext } from "../../../store/CalendarStore";
import useFetchEvents from "../../../hooks/calendar/useFetchEvents";
import useSetMarkedDates from "../../../hooks/calendar/useSetMarkedDates";
import useGetSortedAgendaEvents from "../../../hooks/calendar/useGetSortedAgendaEvents";

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
    }
  ) => void;
};

const ExpandableCalendarScreen = () => {
  const navigate = useNavigation<Navigation>();
  const theme = useRef(getTheme());
  const ctx = useContext(MeetingsContext);
  const sortedEvents = useGetSortedAgendaEvents();
  const markedDates = useSetMarkedDates();
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const { data, error, isLoading } = useFetchEvents();
  useEffect(() => {
    ctx.fetchMeetings(data);
  }, [data, ctx.meetings]);

  const dayLongPressHandler = (date: DateData) => {
    navigate.navigate("Add", {
      date: date.dateString,
    });
  };

  return (
    <View>
      <CalendarProvider
        date={new Date().toDateString()}
        showTodayButton
        disabledOpacity={0.2}
        theme={todayBtnTheme.current}
      >
        <ExpandableCalendar
          initialDate={new Date().toDateString()}
          initialPosition={ExpandableCalendar.positions.OPEN}
          onDayLongPress={dayLongPressHandler}
          calendarStyle={styles.calendar}
          theme={theme.current}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          animateScroll
          scrollEnabled
          closeOnDayPress={true}
          disabledDaysIndexes={[6]}
          markedDates={markedDates}
        />
        <Agenda agendaEvents={sortedEvents} isLoading={isLoading} />
      </CalendarProvider>
    </View>
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
