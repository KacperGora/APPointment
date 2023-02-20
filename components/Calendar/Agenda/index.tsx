import { Agenda, DateData } from "react-native-calendars";
import React, { useRef, useState } from "react";
import { Meeting } from "../../../types";
import MyStatusBar from "../../UI/StatusBar/MyStatusBar";
import { getMonthName, todayDateData } from "../../../Utils/formatUtilis";
import { getCalendarListTheme } from "../Timeline/themes/themes";
import AgendaDay from "./components/AgendaDay/AgendaDay";
import XDate from "xdate";
import useSetMarkedDates from "../../../hooks/calendar/useSetMarkedDates";
import generateDays from "./helpers/generateDays";
import NoMeetingsScreen from "../../UI/NoMeetingsScreen/NoMeetingsScreen";
import TimelineScreenHeader from "../../UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../../UI/Buttons/FloatingButton";

const AgendaComponent: React.FC = () => {
  const markedDates = useSetMarkedDates();
  const agendaRef = useRef<Agenda>();
  const theme = useRef(getCalendarListTheme());
  const items = generateDays(todayDateData);
  const navigate = useNavigation<any>();
  const [monthName, setMonthName] = useState(getMonthName(new Date()));

  const changeMonthNameHandler = (day: XDate & DateData) => {
    setMonthName(getMonthName(day.dateString));
  };

  const onTodayIconPressHandler = () => {
    agendaRef.current.chooseDay(todayDateData, false);
    setMonthName(getMonthName(todayDateData.dateString));
  };

  const renderDayHandler = (date: XDate, item: Meeting) => {
    const nameDay = dayjs(date?.toDate()).format("ddd");
    const nameMonth = dayjs(date?.toDate()).format("MMM");
    const day = date?.getDate();

    return (
      <AgendaDay
        day={day}
        item={item}
        nameDay={nameDay}
        nameMonth={nameMonth}
        fullDate={dayjs(date?.toDate()).format("YYYY-MM-DD")}
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
        disableSearchBar
        onTodayIconPressHandler={onTodayIconPressHandler}
      />
      <Agenda
        items={items}
        renderDay={renderDayHandler}
        onDayChange={changeMonthNameHandler}
        renderEmptyData={renderEmptyDataHandler}
        showClosingKnob
        theme={theme.current}
        ref={agendaRef}
        markedDates={markedDates}
        firstDay={1}
      />
      <FloatingButton
        actions={[]}
        onPress={() => navigate.navigate("Tydzień")}
      />
    </MyStatusBar>
  );
};
export default AgendaComponent;
