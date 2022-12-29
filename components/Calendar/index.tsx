import {
  CalendarViewMode,
  EventItem,
  PackedEvent,
  TimelineCalendarHandle,
} from "@howljs/calendar-kit";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import TimelineComponent from "./Timeline/components/TimelineComponent";
import useFetchEvents from "../../hooks/calendar/useFetchEvents";
import useGetCustomers from "../../hooks/Salon/useGetCustomers";
import TimelineScreenHeader from "../UI/Headers/TimelineScreenHeader";
import MyStatusBar from "../UI/StatusBar/MyStatusBar";
import { getMonthName } from "../../Utils/formatUtilis";
import BottomSheetMeetingForm from "./Timeline/components/BottomSheetMeetingForm";
import ActionButtons from "../UI/ActionButtons/ActionButtons";

type RouteProps = {
  params: {
    viewMode: CalendarViewMode;
  };
};
const Timeline = () => {
  const route = useRoute<RouteProp<RouteProps>>();
  const viewMode = route.params?.viewMode;
  const calendarRef = useRef<TimelineCalendarHandle>(null);
  const thisMonthName = useMemo(() => {
    return getMonthName(new Date());
  }, []);

  const [monthName, setMonthName] = useState(thisMonthName);
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [editedEventDraft, setEditedEventDraft] = useState<PackedEvent>();
  const [timelineHeaderShown, setTimelineHeaderShown] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [bottomSheetActiveIndex, setBottomSheetActiveIndex] = useState(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetDirtyDate, setBottomSheetDirtyDate] = useState(
    new Date().toLocaleString()
  );

  const { flatData, isLoading } = useFetchEvents();
  useEffect(() => {
    setEvents(flatData);
  }, [flatData]);
  useGetCustomers();

  const onPressCancel = () => {
    setSelectedEvent(undefined);
  };
  const onPressSubmit = () => {
    const dirtyEvents = [...events];
    const editedEvent = dirtyEvents.find(
      (event) => event.id === selectedEvent.id
    );
    console.log(editedEvent);
    console.log(editedEventDraft);
    // edited;
    // setEvents((prevEvents) =>
    //   prevEvents.map((ev) => {
    //     return ev.id === selectedEvent?.id ? { ...ev, ...selectedEvent } : ev;
    //   })
    // );
    // setSelectedEvent(undefined);
  };

  const onCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setBottomSheetActiveIndex(0);
  };
  const onTodayIconPressHandler = () => {
    const optionalProps = {
      date: new Date().toISOString().split("T")[0],
      animatedHour: true,
      animatedDate: true,
    };
    calendarRef?.current?.goToDate(optionalProps);
  };
  const confirmButton = {
    title: "Zapisz",
    onPress: onPressSubmit,
  };
  const cancelButton = {
    title: "Anuluj",
    onPress: onPressCancel,
  };
  return (
    <MyStatusBar>
      <TimelineScreenHeader
        setTimelineHeaderShown={setTimelineHeaderShown}
        calendarRef={calendarRef}
        monthName={monthName}
        onTodayIconPressHandler={onTodayIconPressHandler}
      />
      <TimelineComponent
        calendarRef={calendarRef}
        events={events}
        isLoading={isLoading}
        selectedEvent={selectedEvent}
        setBottomSheetActiveIndex={setBottomSheetActiveIndex}
        setBottomSheetDirtyDate={setBottomSheetDirtyDate}
        setBottomSheetVisible={setBottomSheetVisible}
        setMonthName={setMonthName}
        setSelectedEvent={setSelectedEvent}
        setEditedEventDraft={setEditedEventDraft}
        viewMode={viewMode}
        timelineHeaderShown={timelineHeaderShown}
      />
      {bottomSheetVisible ? (
        <BottomSheetMeetingForm
          bottomSheetDirtyDate={bottomSheetDirtyDate}
          index={bottomSheetActiveIndex}
          setIndex={setBottomSheetActiveIndex}
          onCloseBottomSheet={onCloseBottomSheet}
        />
      ) : null}
      {selectedEvent ? (
        <ActionButtons
          confirmButton={confirmButton}
          dismissButton={cancelButton}
          containerStyle={{ alignSelf: "center" }}
        />
      ) : null}
    </MyStatusBar>
  );
};

export default Timeline;
