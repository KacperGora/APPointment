import { AgendaSchedule, DateData } from "react-native-calendars";
import useFetchEvents from "../../../../hooks/calendar/useFetchData";
import { Meeting } from "../../../../types";
import { timeToString } from "../../../../Utils/formatUtilis";

const generateDays = (day: DateData) => {
  const items: AgendaSchedule = {};
  const { eventsData } = useFetchEvents();
  const sortedObj = {};
  const sortedEventsData = Object.entries(eventsData);
  for (let [key, value] of sortedEventsData) {
    const sortedEventsAtDay = value.sort(
      (a: Meeting, b: Meeting) =>
        new Date(a.start).valueOf() - new Date(b.start).valueOf()
    );
    sortedObj[key] = sortedEventsAtDay;
  }

  const MILLISECONDSINDAY = 24 * 60 * 60 * 1000;
  for (let i = -15; i < 85; i++) {
    const time = day.timestamp + i * MILLISECONDSINDAY;
    const strTime = timeToString(time);

    if (!items[strTime]) {
      items[strTime] = eventsData[strTime] || [];
    }
  }

  return items;
};

export default generateDays;
