import React from "react";
import BottomSheetForm from "../../../BottomSheet/BottomSheetForm";
import MeetingForm from "../../Form/MeetingForm";

const BottomSheetMeetingForm = ({
  bottomSheetDirtyDate,
  index,
  setIndex,
  onCloseBottomSheet,
}) => {
  return (
    <BottomSheetForm
      index={index}
      setIndex={setIndex}
      onCloseBottomSheet={onCloseBottomSheet}
    >
      <MeetingForm
        timelineDate={bottomSheetDirtyDate}
        onCloseBottomSheet={onCloseBottomSheet}
      />
    </BottomSheetForm>
  );
};
export default BottomSheetMeetingForm;
