import { useContext, useEffect, useState } from "react";
import { SectionListData } from "react-native";
import { MeetingsContext } from "../../store/CalendarStore";
import { Meeting } from "../../types";

const useGetSortedAgendaEvents = () => {
  const ctx = useContext(MeetingsContext);
  const items = ctx.meetings;
  const [sortedEvents, setSortedEvents] = useState<SectionListData<Meeting>[]>(
    []
  );

  useEffect(() => {
    const meetings = [];
    for (const [key, value] of Object.entries(items)) {
      meetings.push({ title: key, data: [...value] });
      setSortedEvents(meetings);
    }
  }, [items]);
  return sortedEvents;
};
export default useGetSortedAgendaEvents;
