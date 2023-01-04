import { Agenda } from "react-native-calendars";
import React, { useEffect, useRef, useState } from "react";
import { AllMeetings, Meeting } from "../../../types";
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
import useFetchEvents from "../../../hooks/calendar/useFetchEvents";
import generateDays from "./helpers/generateDays";
import { getAgendaDays } from "./helpers/getAgendaDaysName";
import NoMeetingsScreen from "../../UI/NoMeetingsScreen/NoMeetingsScreen";
import useGetEmptyWeeks from "./hooks/useGetEmptyWeeks";

const AgendaComponent: React.FC = () => {
  const { data } = useFetchEvents();
  const markedDates = useSetMarkedDates();
  const agendaRef = useRef<Agenda>();
  const theme = useRef(getCalendarListTheme());
  const items = generateDays(todayDateData, data);
  const [agendaItems, setAgendaItems] = useState<AllMeetings>({});
  const [monthName, setMonthName] = useState(getMonthName(new Date()));
  const emptyWeeks = useGetEmptyWeeks(agendaItems);

  useEffect(() => {
    setAgendaItems(items);
  }, [data]);

  const changeMonthNameHandler = (date) => {
    setMonthName(getMonthName(date.dateString));
  };

  const onTodayIconPressHandler = () => {
    agendaRef.current.chooseDay(todayDateData, true);
    setMonthName(getMonthName(todayDateData.dateString));
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
        renderEmptyData={renderEmptyDataHandler}
        onDayChange={changeMonthNameHandler}
        onMonthChange={changeMonthNameHandler}
        items={agendaItems}
        showClosingKnob
        theme={theme.current}
        ref={agendaRef}
        renderDay={renderDayHandler}
        markedDates={markedDates}
      />
    </MyStatusBar>
  );
};
export default AgendaComponent;
