import React, { useState } from "react";
import { LayoutAnimation, View } from "react-native";
import useFirebase from "../../../../hooks/useFirebase";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent";
import Spinner from "../../../UI/Spinner/Spinner";

import MeetingForm from "../../Form";
import NewMeetingFormSummary from "../../Form/components/FormSummary/NewMeetingFormSummary";
const BottomSheetMeetingForm = ({
  bottomSheetDirtyDate,
  index,
  setIndex,
  onCloseBottomSheet,
  editing,
  selectedEvent,
  editedEventDraft,
}) => {
  const { error, isLoading, makeFirebaseCall } = useFirebase("meetings");

  const deleteEventHandler = async () => {
    await makeFirebaseCall("delete", selectedEvent);
    onCloseBottomSheet();
  };
  const editEventHandler = () => {
    setIndex(1);
    LayoutAnimation.easeInEaseOut();
  };

  return (
    <BottomSheetComponent
      index={index}
      setIndex={setIndex}
      onCloseBottomSheet={onCloseBottomSheet}
    >
      {index === 0 ? (
        isLoading ? (
          <Spinner size={50} borderWidth={5} />
        ) : (
          <NewMeetingFormSummary
            selectedEvent={selectedEvent}
            editing
            onEdit={editEventHandler}
            onDelete={deleteEventHandler}
            editedEventDraft={editedEventDraft}
          />
        )
      ) : (
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
