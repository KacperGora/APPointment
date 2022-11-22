import { useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import useGetSortedAgendaEvents from "./useGetSortedAgendaEvents";

const useSetMarkedDates = () => {
  const [markedDates, setMarkedDates] = useState({});
  const sortedEvents = useGetSortedAgendaEvents();
  console.log(sortedEvents);
  useEffect(() => {
    const marked: MarkedDates = {};
    sortedEvents.length > 0 &&
      sortedEvents?.forEach((el) => {
        if (el.data && el.data.length > 0 && el.data.length < 2) {
          marked[el.title] = { marked: true, dotColor: "green" };
        } else if (el.data.length >= 2 && el.data.length < 4) {
          marked[el.title] = { marked: true, dotColor: "yellow" };
        } else if (el.data.length >= 4) {
          marked[el.title] = { marked: true, dotColor: "red" };
        }
      });
    setMarkedDates(marked);
  }, [sortedEvents]);
  return markedDates;
};
export default useSetMarkedDates;
