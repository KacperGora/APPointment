import { Agenda, DateData } from "react-native-calendars";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Meeting } from "../../../types";
import TimelineScreenHeader from "../../UI/Headers/TimelineScreenHeader";
import MyStatusBar from "../../UI/StatusBar/MyStatusBar";
import {
  getMonthName,
  ISOSplitter,
  todayDateData,
} from "../../../Utils/formatUtilis";
import { getCalendarListTheme } from "../Timeline/themes/themes";
import AgendaDay from "./components/AgendaDay/AgendaDay";
import XDate from "xdate";
import useSetMarkedDates from "../../../hooks/calendar/useSetMarkedDates";
import generateDays from "./helpers/generateDays";
import { getAgendaDays } from "./helpers/getAgendaDaysName";
import NoMeetingsScreen from "../../UI/NoMeetingsScreen/NoMeetingsScreen";
import useGetEmptyWeeks from "./hooks/useGetEmptyWeeks";

const AgendaComponent: React.FC = () => {
  const markedDates = useSetMarkedDates();
  const agendaRef = useRef<Agenda>();
  const theme = useRef(getCalendarListTheme());
  const items = generateDays(todayDateData);

  const emptyWeeks = useGetEmptyWeeks(items);
  const [monthName, setMonthName] = useState(getMonthName(new Date()));

  const changeMonthNameHandler = useCallback((day) => {
    setMonthName(getMonthName(day.dateString));
  }, []);

  const onTodayIconPressHandler = () => {
    agendaRef.current.chooseDay(todayDateData, true);
    setMonthName(getMonthName(todayDateData.dateString));
  };
  const onLongPressHandler = (date: DateData) => {
    setMonthName(getMonthName(date.dateString));
    agendaRef.current.chooseDay(date, false);
  };

  const renderDayHandler = (date: XDate, item: Meeting) => {
    const { nameDay, nameMonth } = getAgendaDays(date);
    const day = date?.getDate();

    return (
      <AgendaDay
        day={day}
        item={item}
        nameDay={nameDay}
        nameMonth={nameMonth}
        fullDate={ISOSplitter(date?.toISOString(), 0)}
        emptyWeeks={emptyWeeks}
      />
    );
  };
  useEffect(() => {
    agendaRef?.current?.chooseDay(todayDateData, true);
  }, []);

  const renderEmptyDataHandler = () => {
    return (
      <NoMeetingsScreen
        description="Dotknij tutaj aby dodać pierwsze"
        heading="Brak spotkań"
        noAgendaEvents
        destination="Tydzień"
      />
    );
  };
  return (
    <MyStatusBar>
      <TimelineScreenHeader
        monthName={monthName}
        disableCalendar
        onTodayIconPressHandler={onTodayIconPressHandler}
      />
      <Agenda
        items={items}
        displayLoadingIndicator
        onDayLongPress={onLongPressHandler}
        renderDay={renderDayHandler}
        renderEmptyData={renderEmptyDataHandler}
        onDayChange={changeMonthNameHandler}
        showClosingKnob
        theme={theme.current}
        ref={agendaRef}
        markedDates={markedDates}
        firstDay={1}
      />
    </MyStatusBar>
  );
};
export default AgendaComponent;
