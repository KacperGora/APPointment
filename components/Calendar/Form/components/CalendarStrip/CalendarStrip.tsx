import "moment";
import "moment/locale/pl";
import React, { FunctionComponent, useRef } from "react";
import CalendarStrip from "react-native-calendar-strip";
import { FormCalendarStripProps } from "../../../../../types";
import { getCalendarStripConfig } from "../../config/formConfig";

const locale = {
  name: "pl",
  config: {},
};
const CalendarStripComponent: FunctionComponent<FormCalendarStripProps> = ({
  date,
  setNewDate,
}) => {
  const calendarStripProps = useRef(getCalendarStripConfig());
  const propsRefShort = calendarStripProps.current;

  const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
    return date.isoWeekday() === 7;
  };
  const dateSelectionHandler = (date: moment.Moment) =>
    setNewDate(date.format("YYYY-MM-DD"));

  return (
    <CalendarStrip
      locale={locale}
      style={propsRefShort.style}
      calendarAnimation={propsRefShort.calendarAnimation}
      daySelectionAnimation={propsRefShort.daySelectionAnimation}
      calendarHeaderStyle={propsRefShort.calendarHeaderStyle}
      dateNumberStyle={propsRefShort.dateNumberStyle}
      dateNameStyle={propsRefShort.dateNameStyle}
      highlightDateNameStyle={propsRefShort.highlightDateNameStyle}
      highlightDateNumberStyle={propsRefShort.highlightDateNumberStyle}
      highlightDateContainerStyle={propsRefShort.highlightDateContainerStyle}
      disabledDateNameStyle={propsRefShort.disabledDateNameStyle}
      disabledDateNumberStyle={propsRefShort.disabledDateNumberStyle}
      scrollable
      iconContainer={{ flex: 0.1 }}
      datesBlacklist={datesBlacklistFunc}
      onDateSelected={dateSelectionHandler}
      selectedDate={new Date(date)}
    />
  );
};

export default CalendarStripComponent;
