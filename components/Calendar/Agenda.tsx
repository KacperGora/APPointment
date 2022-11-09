import { AgendaList } from "react-native-calendars";
import React, { useContext, useCallback, useState, useEffect } from "react";
import { MeetingsContext } from "../../store/store";
import AgendaItem from "./AgendaItem";
import { DefaultSectionT } from "react-native";

const Agenda = () => {
  const ctx = useContext(MeetingsContext);
  const items = ctx?.meetings;
  const [sortedEvents, setSortedEvents] = useState<DefaultSectionT | any>([]);
  const newArr: DefaultSectionT[] = [];

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  useEffect(() => {
    for (const [key, value] of Object.entries(items)) {
      newArr.push({ key: key, data: [...value] });
    }
    const sortedArray = newArr.sort(
      (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime()
    );
    setSortedEvents(sortedArray);
  }, [items]);

  return (
    <AgendaList
      sections={sortedEvents}
      renderItem={renderItem}
      scrollToNextEvent={sortedEvents.length > 0 ? true : false}
      dayFormat={"dd.MM.yyyy"}
      avoidDateUpdates={false}
    />
  );
};
export default Agenda;
