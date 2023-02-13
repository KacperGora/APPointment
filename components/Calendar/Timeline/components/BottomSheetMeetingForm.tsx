import { PackedEvent } from "@howljs/calendar-kit";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { LayoutAnimation, View } from "react-native";
import useFirebase from "../../../../hooks/useFirebase";
import { Meeting } from "../../../../types";
import getEventExcludedTimes from "../../../../Utils/getEventExcludedTimes";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent";
import Spinner from "../../../UI/Spinner/Spinner";
import { differenceInMinutes } from "date-fns";
import MeetingForm from "../../Form";
import NewMeetingFormSummary from "../../Form/components/FormSummary/NewMeetingFormSummary";
import useGetEditedEventValues from "../../../../hooks/calendar/useGetEditedEventValues";
type TypeProps = {
  bottomSheetDirtyDate: any;
  index: any;
  setIndex: any;
  onCloseBottomSheet: any;
  selectedEvent: any;
  editedEventDraft: Meeting;
  eventMove: boolean;
};
const BottomSheetMeetingForm: React.FC<TypeProps> = ({
  bottomSheetDirtyDate,
  index,
  setIndex,
  onCloseBottomSheet,
  selectedEvent,
  editedEventDraft,
  eventMove,
}) => {
  const { error, isLoading, makeFirebaseCall } = useFirebase("meetings");

  const deleteEventHandler = async () => {
    await makeFirebaseCall("delete", selectedEvent);
    onCloseBottomSheet();
  };
  const dragToEditHandler = async () => {
    const initialEventDate = editedEventDraft.day;
    const editedEvent = useGetEditedEventValues(editedEventDraft);
    await makeFirebaseCall("edit", editedEvent, initialEventDate);
    onCloseBottomSheet();
  };
  const editEventHandler = () => {
    !!editedEventDraft ? dragToEditHandler() : setIndex(2);
    LayoutAnimation.easeInEaseOut();
  };
  useEffect(() => {
    eventMove && setIndex(0);
  }, [eventMove]);
  console.log(index);
  return (
    <BottomSheetComponent
      index={index}
      setIndex={setIndex}
      onCloseBottomSheet={onCloseBottomSheet}
    >
      {isLoading ? (
        <Spinner size={50} borderWidth={5} />
      ) : (
        index !== 2 && (
          <NewMeetingFormSummary
            selectedEvent={selectedEvent}
            editing
            onEdit={editEventHandler}
            onDelete={deleteEventHandler}
            editedEventDraft={editedEventDraft}
            eventMove={eventMove}
            index={index}
          />
        )
      )}

      {index === 2 && (
        <MeetingForm
          timelineDate={bottomSheetDirtyDate}
          onCloseBottomSheet={onCloseBottomSheet}
          selectedEvent={selectedEvent}
        />
      )}
    </BottomSheetComponent>
  );
};
export default BottomSheetMeetingForm;
