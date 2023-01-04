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
import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addHours, addMinutes } from "date-fns/esm";
import getEventExcludedTimes from "../../Utils/getEventExcludedTimes";
import { eachMinuteOfInterval, subHours } from "date-fns";

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
  const excludedFullDate = eachMinuteOfInterval(
    {
      start: new Date(editedEventDraft?.start),
      end: new Date(editedEventDraft?.end),
    },
    { step: 15 }
  );
  const excludedTimes = excludedFullDate.map((date) =>
    date.toTimeString().slice(0, 5)
  );
  const onPressSubmit = async () => {
    const dirtyEvents = [...events];
    let editedEvent = dirtyEvents.find(
      (event) => event.id === selectedEvent.id
    );
    editedEvent = {
      ...editedEventDraft,
      day: editedEventDraft?.start.split("T")[0],
      id: editedEventDraft?.start + Math.random(),
      endHour: addHours(new Date(editedEventDraft?.end), 1)
        .toISOString()
        .split("T")[1]
        .slice(0, 5),
      startHour: addHours(new Date(editedEventDraft?.start), 1)
        .toISOString()
        .split("T")[1]
        .slice(0, 5),
      startHourStr: addHours(new Date(editedEventDraft?.start), 1)
        .toISOString()
        .split("T")[1]
        .slice(0, 5),
      excludedTimes: excludedTimes,
    };
    setEvents((currState) => [
      ...currState.filter((event) => event.id !== selectedEvent.id),
      editedEvent,
    ]);
    // console.log(selectedEvent.start.split("T")[0]);
    // console.log(selectedEvent.id);
    // console.log(editedEventDraft?.start.split("T")[0]);
    // console.log(editedEvent?.id);
    const cityRef = doc(db, "meetings", selectedEvent.start.split("T")[0]);
    await updateDoc(cityRef, {
      meetings: deleteField(),
    });
    // const meetingRef = doc(
    //   db,
    //   "meetings",
    //   editedEventDraft?.start..split("T")[0]
    // );
    // const docSnap = await getDoc(meetingRef);
    // console.log(docSnap.data());
    // try {
    //   const meetingsRef = doc(
    //     db,
    //     "meetings",
    //     editedEvent?.start?.split("T")[0]
    //   );
    //   const docSnap = await getDoc(meetingsRef);
    //   if (docSnap.exists()) {
    //     await updateDoc(meetingsRef, {
    //       meetings: events,
    //     });
    //   } else {
    //     setDoc(doc(db, "meetings", editedEvent.start.split("T")[0]), {
    //       meetings: [editedEvent],
    //     });
    //   }
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   throw new Error(e);
    // } finally {
    // }
    setSelectedEvent(undefined);
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
