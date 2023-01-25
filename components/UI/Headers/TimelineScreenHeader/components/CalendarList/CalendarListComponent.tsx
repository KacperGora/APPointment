import React, { useRef } from "react";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import useSetMarkedDates from "../../../../../../hooks/calendar/useSetMarkedDates";
import { getCalendarListTheme } from "../../../../../Calendar/Timeline/themes/themes";
import { getCalendarLocale } from "../../../../../shared";
import GestureDetectorComponent from "../../../../GestureDetectorComponent/GestureDetectorComponent";
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

  return (
    <GestureDetectorComponent onGestureStartHandler={onGestureStartHandler}>
      <CalendarList
        horizontal={true}
        animateScroll
        disabledDaysIndexes={[6]}
        firstDay={1}
        ref={calendarListRef}
        markedDates={markedDates}
        onMonthChange={dateChangeHandler}
        renderHeader={() => null}
        theme={theme.current}
        onDayPress={dateChangeHandler}
        pagingEnabled={true}
      />
    </GestureDetectorComponent>
  );
};
export default CalendarListComponent;
