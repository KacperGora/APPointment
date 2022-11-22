import { useContext, useEffect, useState } from "react";
import { DefaultSectionT } from "react-native";
import { MeetingsContext } from "../../store/CalendarStore";

const useGetSortedAgendaEvents = () => {
  const ctx = useContext(MeetingsContext);
  const items = ctx.meetings;
  const [sortedEvents, setSortedEvents] = useState<DefaultSectionT | any>(
    items
  );
  useEffect(() => {
    setSortedEvents(items);
  }, [items]);

  const meetings = [];
  useEffect(() => {
    for (const [key, value] of Object.entries(items)) {
      meetings.push({ title: key, data: [...value] });
      setSortedEvents(meetings);
    }
  }, [items]);

  return sortedEvents;
};
export default useGetSortedAgendaEvents;
