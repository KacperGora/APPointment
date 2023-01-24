import {
  EventItem,
  PackedEvent,
  TimelineCalendarHandle,
} from "@howljs/calendar-kit";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import TimelineComponent from "./components/TimelineComponent";
import useFetchEvents from "../../../hooks/calendar/useFetchEvents";
import MyStatusBar from "../../UI/StatusBar/MyStatusBar";
import { getMonthName } from "../../../Utils/formatUtilis";
import BottomSheetMeetingForm from "./components/BottomSheetMeetingForm";
import { RouteProps } from "../../../types";
import BottomSheetSelectedEvent from "./components/BottomSheetSelectedEvent";
import TimelineScreenHeader from "../../UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import dayjs from "dayjs";
import NoCustomerModal from "../Form/components/NoCustomerModal/NoCustomerModal";
import { Modal } from "react-native";

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
  const [showModal, setShowModal] = useState(false);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [bottomSheetActiveIndex, setBottomSheetActiveIndex] = useState(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetDirtyDate, setBottomSheetDirtyDate] = useState(
    new Date().toLocaleString()
  );
  const { flatData, isLoading } = useFetchEvents();

  useEffect(() => {
    setEvents(flatData);
  }, [flatData]);

  const onCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setBottomSheetActiveIndex(0);
  };
  const optionalProps = {
    date: searchedEvents[0]?.day || dayjs().format("YYYY-MM-DD"),
    animatedHour: true,
    animatedDate: true,
  };

  const onTodayIconPressHandler = () => {
    calendarRef?.current?.goToDate(optionalProps);
  };

  useEffect(() => {
    if (searchedEvents.length !== 0) {
      setEvents(searchedEvents);
      calendarRef?.current?.goToDate(optionalProps);
    } else {
      setEvents(flatData);
      calendarRef?.current?.goToDate(optionalProps);
      // setShowModal(true);
    }
  }, [searchedEvents]);
  return (
    <MyStatusBar>
      <TimelineScreenHeader
        setTimelineHeaderShown={setTimelineHeaderShown}
        calendarRef={calendarRef}
        monthName={monthName}
        onTodayIconPressHandler={onTodayIconPressHandler}
        setSearchedEvents={setSearchedEvents}
        disableCalendar={false}
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
        <BottomSheetSelectedEvent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          editedEventDraft={editedEventDraft}
        />
      ) : null}
    </MyStatusBar>
  );
};

export default Timeline;
