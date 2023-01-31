import { useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import useFetchEvents from "./useFetchData";

const useSetMarkedDates = () => {
  const [markedDates, setMarkedDates] = useState({});
  const { eventsData } = useFetchEvents();
  useEffect(() => {
    const marked: MarkedDates = {};
    for (const key of Object.keys(eventsData)) {
      marked[key] = {
        marked: true,
        dotColor: eventsData[key].length > 4 ? "red" : "green",
      };
    }
    setMarkedDates(marked);
  }, [eventsData]);

  return markedDates;
};
export default useSetMarkedDates;
