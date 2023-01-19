import React from "react";
import BottomSheet from "../../../BottomSheet/BottomSheetComponent";
import BottomSheetForm from "../../../BottomSheet/BottomSheetComponent";
import MeetingForm from "../../Form";

const BottomSheetMeetingForm = ({
  bottomSheetDirtyDate,
  index,
  setIndex,
  onCloseBottomSheet,
}) => {
  return (
    <BottomSheet
      index={index}
      setIndex={setIndex}
      onCloseBottomSheet={onCloseBottomSheet}
    >
      <MeetingForm
        timelineDate={bottomSheetDirtyDate}
        onCloseBottomSheet={onCloseBottomSheet}
      />
    </BottomSheet>
  );
};
export default BottomSheetMeetingForm;
