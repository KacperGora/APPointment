import { useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import useFetchEvents from "./useFetchEvents";

const useSetMarkedDates = () => {
  const [markedDates, setMarkedDates] = useState({});
  const { data } = useFetchEvents();
  useEffect(() => {
    const marked: MarkedDates = {};
    for (const key of Object.keys(data)) {
      marked[key] = {
        marked: true,
        dotColor: data[key].length > 4 ? "red" : "green",
      };
    }
    setMarkedDates(marked);
  }, [data]);

  return markedDates;
};
export default useSetMarkedDates;
