import React, { useRef, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ExpandableCalendar,
  CalendarProvider,
  DateData,
} from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import Agenda from "../Agenda/Agenda";
import { getTheme, themeColor } from "./calendarThemes";
import { MeetingsContext } from "../../../store/CalendarStore";
import useFetchEvents from "../../../hooks/calendar/useFetchEvents";
import useSetMarkedDates from "../../../hooks/calendar/useSetMarkedDates";
import useGetSortedAgendaEvents from "../../../hooks/calendar/useGetSortedAgendaEvents";
import ErrorComponent from "./ErrorComponent";
import { Navigation } from "../../../types";
import useGetCustomers from "../../../hooks/Salon/useGetCustomers";
import { SaloonContext } from "../../../store/SaloonStore";

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

const ExpandableCalendarScreen = () => {
  const navigate = useNavigation<Navigation>();
  const theme = useRef(getTheme());
  const ctx = useContext(MeetingsContext);
  const { data, error, isLoading } = useFetchEvents();
  const sortedEvents = useGetSortedAgendaEvents();
  const markedDates = useSetMarkedDates();
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
useGetCustomers()
  useEffect(() => {
    ctx.fetchMeetings(data);
  }, [data, ctx.meetings]);

  const dayLongPressHandler = (date: DateData) => {
    navigate.navigate("AddEvent", {
      date: date.dateString,
    });
  };

  return (
    <CalendarProvider
      date={new Date().toDateString()}
      showTodayButton
      disabledOpacity={0.2}
      theme={todayBtnTheme.current}
    >
      {!error ? (
        <>
          <ExpandableCalendar
            initialDate={new Date().toDateString()}
            initialPosition={ExpandableCalendar.positions.OPEN}
            onDayLongPress={dayLongPressHandler}
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
        </>
      ) : (
        <ErrorComponent />
      )}
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;
