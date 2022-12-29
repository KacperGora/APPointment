import {
  OnChangeProps,
  PackedEvent,
  TimelineCalendar,
  UnavailableItemProps,
} from "@howljs/calendar-kit";
import { addDays } from "date-fns";
import React, { useCallback, useContext, useRef } from "react";
import CustomUnavailableItem from "./CustomUnavailableItem";
import TimelineEventContent from "./TimelineEventContent";
import { SaloonContext } from "../../../../store/SaloonStore";
import { TimelineProps } from "../../../../types";
import { getTimelineTheme } from "../themes/themes";
import { getMonthName } from "../../../../Utils/formatUtilis";

const TimelineComponent: React.FC<TimelineProps> = (props) => {
  const {
    isLoading,
    calendarRef,
    viewMode,
    selectedEvent,
    events,
    setBottomSheetActiveIndex,
    setBottomSheetVisible,
    setBottomSheetDirtyDate,
    setMonthName,
    setSelectedEvent,
    timelineHeaderShown,
    setEditedEventDraft,
  } = props;

  const salonCtx = useContext(SaloonContext);
  const unavailableHours = salonCtx.unavailableHours;
  const timelineTheme = useRef(getTimelineTheme());
  const renderEventContent = useCallback(
    (event: PackedEvent) => (
      <TimelineEventContent event={event} userPickedView={viewMode} />
    ),
    []
  );

  const onLongPressEvent = (event: PackedEvent) => {
    setSelectedEvent(event);
  };
  const renderCustomUnavailableItem = useCallback(
    (props: UnavailableItemProps) => <CustomUnavailableItem {...props} />,
    []
  );

  const monthNameChangeHandler = (e: OnChangeProps) => {
    setMonthName(getMonthName(e.date));
  };

  const longPressHandler = (date: string | number | Date) => {
    const correctDate = addDays(new Date(date), 1).toISOString().split("T")[0];
    setBottomSheetDirtyDate(correctDate);
    setBottomSheetActiveIndex(1);
    setBottomSheetVisible(true);
  };
  const onEndDragSelectedEvent = (e) => {
    setEditedEventDraft(e);
  };
  return (
    <TimelineCalendar
      isLoading={isLoading}
      ref={calendarRef}
      start={7}
      isShowHeader={timelineHeaderShown}
      timeZone="Europe/Warsaw"
      viewMode={viewMode}
      allowPinchToZoom
      overlapEventsSpacing={4}
      locale="pl"
      scrollToNow={false}
      unavailableHours={unavailableHours}
      events={events}
      selectedEvent={selectedEvent}
      dragStep={15}
      dragCreateInterval={90}
      theme={timelineTheme.current}
      onEndDragSelectedEvent={onEndDragSelectedEvent}
      onChange={monthNameChangeHandler}
      renderEventContent={renderEventContent}
      onLongPressEvent={onLongPressEvent}
      onLongPressBackground={longPressHandler}
      renderCustomUnavailableItem={renderCustomUnavailableItem}
    />
  );
};
export default React.memo(TimelineComponent);
