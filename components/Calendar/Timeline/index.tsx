import {
  EventItem,
  PackedEvent,
  TimelineCalendarHandle,
} from "@howljs/calendar-kit";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TimelineComponent from "./components/TimelineComponent";
import MyStatusBar from "../../UI/StatusBar/MyStatusBar";
import BottomSheetMeetingForm from "./components/BottomSheetMeetingForm";
import { Meeting, RouteProps } from "../../../types";
import TimelineScreenHeader from "../../UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import dayjs from "dayjs";
import { getFloatingButtonActions } from "./config/timelineConfig";
import { SaloonContext } from "../../../store/SaloonStore";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import FloatingButton from "../../UI/Buttons/FloatingButton";
import { LayoutAnimation } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import useFetchData from "../../../hooks/calendar/useFetchData";
import useScheduleNotification from "./hooks/useScheduleNotification";
import useSearchHandler from "../../../hooks/useSearchHandler";

const Timeline = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteProps>>();
  const viewMode = route.params?.viewMode;

  const calendarRef = useRef<TimelineCalendarHandle>(null);
  const thisMonthName = useMemo(() => {
    return dayjs().format("MMMM");
  }, []);
  const [monthName, setMonthName] = useState(thisMonthName);
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [editedEventDraft, setEditedEventDraft] = useState<
    PackedEvent & Meeting
  >();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [eventMove, setEventMove] = useState(false);
  const [timelineHeaderShown, setTimelineHeaderShown] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [bottomSheetActiveIndex, setBottomSheetActiveIndex] = useState(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetDirtyDate, setBottomSheetDirtyDate] = useState(
    route.params.date || dayjs().format("YYYY-MM-DD")
  );

  const salonContext = useContext(SaloonContext);
  const actions = useMemo(() => {
    return getFloatingButtonActions();
  }, []);
  const { eventsFlatData, isLoading, customers } = useFetchData();
  const {
    scheduleNotificationHandlerIncomingEvent,
    scheduleNotificationHandlerDailyReport,
  } = useScheduleNotification();
  useEffect(() => {
    const controller = new AbortController();
    scheduleNotificationHandlerIncomingEvent();
    scheduleNotificationHandlerDailyReport();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setEvents(eventsFlatData);
  }, [eventsFlatData]);

  const onCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setBottomSheetActiveIndex(0);
    setEditedEventDraft(undefined);
    setEventMove(false);
    !!selectedEvent && setSelectedEvent(undefined);
    bottomSheetRef.current?.close();
  };

  const onTodayIconPressHandler = () => {
    const optionalProps = {
      date: dayjs().format("YYYY-MM-DD"),
      animatedHour: true,
      animatedDate: true,
    };
    calendarRef?.current?.goToDate(optionalProps);
  };

  useEffect(() => {
    const optionalProps = {
      date: searchedEvents[0]?.day,
      animatedHour: true,
      animatedDate: true,
    };
    if (searchedEvents.length !== 0) {
      setEvents(searchedEvents);
      calendarRef?.current?.goToDate(optionalProps);
    } else {
      setEvents(eventsFlatData);
      calendarRef?.current?.goToDate(optionalProps);
    }
  }, [searchedEvents]);

  const { searchFn } = useSearchHandler("events");
  const searchPressHandler = (searchedValue: string) => {
    const filteredData = searchFn(searchedValue);
    setSearchedEvents(filteredData);
  };
  const addMeetingButtonPressHandler = () => {
    setBottomSheetDirtyDate(dayjs().format("YYYY-MM-DD"));
    setBottomSheetVisible(true);
    setBottomSheetActiveIndex(2);
  };
  const addCustomerButtonPressHandler = () => {
    navigation.navigate("Klienci");
  };
  const floatingButtonsPressHandler = (name: string) => {
    name === "Meeting"
      ? addMeetingButtonPressHandler()
      : addCustomerButtonPressHandler();
  };
  useEffect(() => {
    const optionalProps = {
      date: route.params.date,
      animatedHour: true,
      animatedDate: true,
    };
    calendarRef?.current?.goToDate(optionalProps);
    searchPressHandler(route?.params?.event?.id);
  }, [route.params]);

  const eventMoveHandler = () => {
    setEventMove(true);
    LayoutAnimation.easeInEaseOut();
  };
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      searchPressHandler(null);
      setSearchedEvents([]);
    })
    .runOnJS(true);

  return (
    <MyStatusBar>
      <TimelineScreenHeader
        setTimelineHeaderShown={setTimelineHeaderShown}
        onTodayIconPressHandler={onTodayIconPressHandler}
        searchPressHandler={searchPressHandler}
        calendarRef={calendarRef}
        monthName={monthName}
        disableCalendar={false}
      />
      <GestureDetector gesture={doubleTap}>
        <TimelineComponent
          calendarRef={calendarRef}
          events={events}
          isLoading={isLoading}
          selectedEvent={selectedEvent}
          viewMode={viewMode}
          timelineHeaderShown={timelineHeaderShown}
          setBottomSheetActiveIndex={setBottomSheetActiveIndex}
          setBottomSheetDirtyDate={setBottomSheetDirtyDate}
          setBottomSheetVisible={setBottomSheetVisible}
          setMonthName={setMonthName}
          setSelectedEvent={setSelectedEvent}
          setEditedEventDraft={setEditedEventDraft}
          eventMoveHandler={eventMoveHandler}
        />
      </GestureDetector>
      <FloatingButton actions={actions} onPress={floatingButtonsPressHandler} />
      {bottomSheetVisible || selectedEvent ? (
        <BottomSheetMeetingForm
          bottomSheetDirtyDate={bottomSheetDirtyDate}
          selectedEvent={!!selectedEvent ? selectedEvent : null}
          index={bottomSheetActiveIndex}
          setIndex={setBottomSheetActiveIndex}
          onCloseBottomSheet={onCloseBottomSheet}
          editedEventDraft={editedEventDraft}
          eventMove={eventMove}
        />
      ) : null}
    </MyStatusBar>
  );
};

export default Timeline;
