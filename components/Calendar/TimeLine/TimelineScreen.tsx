import {
  CalendarViewMode,
  EventItem,
  PackedEvent,
  TimelineCalendar,
} from "@howljs/calendar-kit";

import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MeetingsContext } from "../../../store/store";
import { colors } from "../../colors";
import TimelineEventContent from "./TimelineEventContent";
import TimelineViewPicker from "./TimeLineViewPicker";
import TimelineWorkerPicker from "./TimelineWorkerPicker";

const Calendar = ({ navigation }) => {
  const ctx = useContext(MeetingsContext);
  const [userPickedView, setUserPickedView] = useState<CalendarViewMode>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [worker, setWorker] = useState("");
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
      setFilteredEvents(events.filter((event) => event.worker === worker));
    } else {
      setFilteredEvents(events);
    }
  }, [worker]);

  const _onLongPressEvent = (event: PackedEvent) => {
    setSelectedEvent(event);
  };

  const _onPressCancel = () => {
    setSelectedEvent(undefined);
  };

  const _onPressSubmit = () => {
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

  const _renderEditFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={_onPressCancel}>
          <Text style={styles.btnText}>Anuluj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_onPressSubmit}>
          <Text style={styles.btnText}>Zapisz</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const _onDragCreateEnd = (event) => {
    // // console.log(new Date(event.start));
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
    const correctDate = new Date(date).toDateString();
    navigation.navigate("Add", {
      date: correctDate,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <TimelineWorkerPicker setWorker={setWorker} />
        <TimelineViewPicker setUserPickedView={setUserPickedView} />
      </View>
      <TimelineCalendar
        viewMode={userPickedView}
        allowDragToCreate
        allowPinchToZoom
        locale="pl"
        renderEventContent={(event) => <TimelineEventContent event={event} />}
        unavailableHours={[
          { start: 0, end: 7 },
          { start: 22, end: 24 },
        ]}
        isShowHeader
        events={filteredEvents}
        onLongPressEvent={_onLongPressEvent}
        onDragCreateEnd={_onDragCreateEnd}
        onLongPressBackground={longPressHandler}
        selectedEvent={selectedEvent}
        onEndDragSelectedEvent={setSelectedEvent}
        dragStep={15}
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
      {!!selectedEvent && _renderEditFooter()}
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    height: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    borderRadius: 6,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: { fontSize: 16, color: "#FFF", fontWeight: "bold" },
});
