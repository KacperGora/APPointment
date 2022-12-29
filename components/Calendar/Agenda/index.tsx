import {
  Agenda,
  AgendaEntry,
  AgendaList,
  DateData,
} from "react-native-calendars";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AgendaProps, Meeting } from "../../../types";
import AgendaItem from "./components/AgendaItem/AgendaItem";
import { MeetingsContext } from "../../../store/CalendarStore";
import TimelineScreenHeader from "../../UI/Headers/TimelineScreenHeader";
import MyStatusBar from "../../UI/StatusBar/MyStatusBar";
import {
  getAgendaDays,
  getMonthName,
  timeToString,
  todayDateData,
} from "../../../Utils/formatUtilis";
import { getCalendarListTheme } from "../Timeline/themes/themes";
import XDate from "xdate";
import AgendaDay from "./components/AgendaDay/AgendaDay";
import AgendaEmptyDate from "./components/AgendaEmptyDate/AgendaEmptyDate";

const AgendaComponent: React.FC<AgendaProps> = ({ isLoading }) => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  const [agendaItems, setAgendaItems] = useState({});
  const currentMonthName = useCallback(() => {
    return getMonthName(new Date());
  }, []);
  const [monthName, setMonthName] = useState(currentMonthName);
  const theme = useRef(getCalendarListTheme());
  const agendaRef = useRef<Agenda>();

  const items = {};
  const loadItems = (day: DateData) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        items[strTime] = [];
      }
    }, 1000);
  };
  useEffect(() => {
    for (const [key, value] of Object.entries(meetings)) {
      items[key] = [...value];
    }
    setAgendaItems(items);
  }, [meetings]);
  const renderItem = (reservation: Meeting) => {
    return <AgendaItem item={reservation} />;
  };

  const renderEmptyDate = useCallback(() => {
    return <AgendaEmptyDate />;
  }, []);

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
        fullDate={date}
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
        onDayChange={changeMonthNameHandler}
        onMonthChange={changeMonthNameHandler}
        loadItemsForMonth={loadItems}
        renderEmptyDate={renderEmptyDate}
        items={agendaItems}
        showClosingKnob
        theme={theme.current}
        ref={agendaRef}
        renderDay={renderDayHandler}
      />
    </MyStatusBar>
  );
};
export default AgendaComponent;
