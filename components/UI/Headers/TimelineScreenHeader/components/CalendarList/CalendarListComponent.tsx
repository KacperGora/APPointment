import React, { useRef } from "react";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import useSetMarkedDates from "../../../../../../hooks/calendar/useSetMarkedDates";
import { getCalendarListTheme } from "../../../../../Calendar/Timeline/themes/themes";
import { getCalendarLocale } from "../../../../../shared";
LocaleConfig.locales["pl"] = getCalendarLocale();
LocaleConfig.defaultLocale = "pl";
const CalendarListComponent = ({ calendarRef }) => {
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
  );
};
export default CalendarListComponent;
