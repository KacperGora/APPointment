import React, { useRef } from "react";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import useSetMarkedDates from "../../../../../../hooks/calendar/useSetMarkedDates";
import { getCalendarListTheme } from "../../../../../Calendar/Timeline/themes/themes";
import { getCalendarLocale } from "../../../../../shared";
LocaleConfig.locales["pl"] = getCalendarLocale();
LocaleConfig.defaultLocale = "pl";
const CalendarListComponent = ({ calendarRef, onGestureStartHandler }) => {
  const markedDates = useSetMarkedDates();
  const calendarListRef = useRef();

  const theme = useRef(getCalendarListTheme());
  const dateChangeHandler = (date: DateData) => {
    const optionalProps = {
      date: date.dateString,
      hourScroll: true,
      animatedHour: true,
      animatedDate: false,
    };
    calendarRef?.current?.goToDate(optionalProps);
  };
  const show = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(onGestureStartHandler);

  return (
    <GestureDetector gesture={show}>
      <CalendarList
        horizontal={true}
        animateScroll
        disabledDaysIndexes={[6]}
        firstDay={1}
        ref={calendarListRef}
        calendarHeight={200}
        markedDates={markedDates}
        onMonthChange={dateChangeHandler}
        renderHeader={() => null}
        style={{ height: 270 }}
        theme={theme.current}
        onDayPress={dateChangeHandler}
        pagingEnabled={true}
      />
    </GestureDetector>
  );
};
export default CalendarListComponent;
