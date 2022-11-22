import {
  CalendarViewMode,
  EventItem,
  PackedEvent,
  TimelineCalendar,
  UnavailableItemProps,
} from "@howljs/calendar-kit";
import { addDays } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MeetingsContext } from "../../../store/CalendarStore";
import { colors } from "../../colors";
import CustomUnavailableItem from "./CustomUnavailableItem";
import EditFooter from "./EditFooter";
import TimelineEventContent from "./TimelineEventContent";
import TimelineViewPicker from "./TimeLineViewPicker";
import TimelineWorkerPicker from "./TimelineWorkerPicker";

const Calendar = ({ navigation }) => {
  const ctx = useContext(MeetingsContext);
  const [userPickedView, setUserPickedView] = useState<CalendarViewMode>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [worker, setWorker] = useState("all");

  const newArr = [];
  useEffect(() => {
    for (const [key, value] of Object.entries(ctx.meetings)) {
      newArr.push(...value);
    }
    setEvents(newArr);
  }, [ctx.meetings]);

  useEffect(() => {
    setFilteredEvents(events);
    if (worker !== "all") {
      setFilteredEvents(events.filter((event) => event?.worker === worker));
    } else {
      setFilteredEvents(events);
    }
  }, [worker, events]);

  const _onLongPressEvent = (event: PackedEvent) => {
    setSelectedEvent(event);
  };

  const onPressCancel = () => {
    setSelectedEvent(undefined);
  };

  const onPressSubmit = () => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) => {
        if (ev.id === selectedEvent?.id) {
          return { ...ev, ...selectedEvent };
        }
        return ev;
      })
    );
    setSelectedEvent(undefined);
  };

  const _renderEditFooter = () => {};
  const _onDragCreateEnd = (event) => {
    console.log(new Date(event.start));
    // const randomId = Math.random().toString(36).slice(2, 10);
    // const newEvent = {
    //   id: randomId,
    //   title: randomId,
    //   start: event.start,
    //   end: event.end,
    //   color: "#A3C7D6",
    // };
    // setEvents((prev) => [...prev, newEvent]);
  };
  const longPressHandler = (date, event) => {
    const correctDate = addDays(new Date(date), 1).toISOString().split("T")[0];

    // navigation.navigate("Add", {
    //   date: correctDate,
    // });
  };
  const _renderCustomUnavailableItem = useCallback(
    (props: UnavailableItemProps) => <CustomUnavailableItem {...props} />,
    []
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timelineMenuContainer}>
        <TimelineWorkerPicker setWorker={setWorker} />
        <TimelineViewPicker setUserPickedView={setUserPickedView} />
      </View>
      <TimelineCalendar
        viewMode={userPickedView}
        allowDragToCreate
        allowPinchToZoom
        overlapEventsSpacing={4}
        locale="pl"
        renderEventContent={(event) => <TimelineEventContent event={event} />}
        unavailableHours={[
          { start: 0, end: 7 },
          { start: 22, end: 24 },
        ]}
        isShowHeader
        events={filteredEvents}
        onLongPressEvent={_onLongPressEvent}
        // onDragCreateEnd={_onDragCreateEnd}
        onLongPressBackground={longPressHandler}
        selectedEvent={selectedEvent}
        onPressEvent={_onDragCreateEnd}
        onEndDragSelectedEvent={setSelectedEvent}
        renderCustomUnavailableItem={_renderCustomUnavailableItem}
        dragStep={15}
        scrollToNow
        start={1}
        onPressDayNum={(date) => console.log(date)}
        theme={{
          // @ts-ignore: Unreachable code error
          dragHourColor: "#001253",
          dragHourBorderColor: "#001253",
          dragHourBackgroundColor: "#FFF",
          editIndicatorColor: "#FFF",
          dayName: { color: colors.primary },
          todayName: { color: colors.primary },
          nowIndicatorColor: colors.primary,
          todayNumberContainer: { backgroundColor: colors.primary },
          eventTitle: { fontSize: 14 },
        }}
       
      />
      {!!selectedEvent ? (
        <EditFooter
          onPressCancel={onPressCancel}
          onPressSubmit={onPressSubmit}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  timelineMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
