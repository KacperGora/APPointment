import React, { useContext, useEffect, useState } from "react";
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  LocaleConfig,
  TimelineList,
  TimelineProps,
} from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/store";
import { StyleSheet } from "react-native";
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

const TimelineScreen = () => {
  const navigation = useNavigation();
  const ctx = useContext(MeetingsContext);
  const events = ctx.meetings;
  const [eventsByDate, setEventsByDate] = useState(events);
  useEffect(() => {
    setEventsByDate(events);
  }, [events]);
  console.log(eventsByDate);
  const today = new Date();
  const getDate = (offset = 0) =>
    CalendarUtils.getCalendarDateString(
      new Date().setDate(today.getDate() + offset)
    );

  const [currentDate, setCurrentDate] = useState(getDate);
  const [visibleDays, setVisibleDays] = useState(1);
  const INITIAL_TIME = { hour: 9, minutes: 0 };
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const onDateChanged = (date: string) => {
    setCurrentDate(date);
  };
  const onMonthChange = (month: any, updateSource: any) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  };
  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  const approveNewEvent: TimelineProps["onBackgroundLongPressOut"] = (
    _timeString,
    timeObject
  ) => {
    // console.log(_timeString.split(' ')[0]);
  };
  const createNewEvent: TimelineProps["onBackgroundLongPress"] = (
    timeString,
    timeObject
  ) => {
    console.log(timeObject);
    navigation.navigate("Add", {
      date: timeObject,
    });
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    scrollToFirst: true,
    // start: 0,
    // end: 24,
    onEventPress: (event) => console.log(event),
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    timelineLeftInset: 100,
  };
  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      numberOfDays={selectedLanguage}
    >
      <ExpandableCalendar firstDay={1} markedDates={marked} />

      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToNow
        scrollToFirst
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
};
export default TimelineScreen;
const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
  },
});
