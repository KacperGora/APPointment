import { AgendaSchedule, DateData } from "react-native-calendars";
import useFetchEvents from "../../../../hooks/calendar/useFetchData";
import { timeToString } from "../../../../Utils/formatUtilis";

const generateDays = (day: DateData) => {
  const items: AgendaSchedule = {};
  const { eventsData } = useFetchEvents();

  for (let i = -15; i < 85; i++) {
    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    if (!items[strTime]) {
      items[strTime] = eventsData[strTime] || [];
    }
  }
  return items;
};

export default generateDays;
