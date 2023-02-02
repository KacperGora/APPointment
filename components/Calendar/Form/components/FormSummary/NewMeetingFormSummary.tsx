import React from "react";
import { MeetingDetailProps } from "../../../../../types";
import SummaryColumn from "./MeetingFormSummaryColumns/SummaryColumn";
import { RowContainerSpaceBetween, shadowStyle } from "../../../../shared";
import { SummaryViewContainer } from "../../style/Form.style";
import { getSummaryColumnsData } from "../../config/formConfig";
import dayjs from "dayjs";
import BottomSheetToolBar from "../../../../BottomSheet/BottomSheetToolBar";
import { View } from "react-native";

const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  endHour,
  worker,
  submitHandler,
  customerName,
  children,
  style,
  selectedEvent,
  editing,
  onDelete,
  onEdit,
  editedEventDraft,
}) => {
  const dateString = dayjs(
    editedEventDraft?.start || selectedEvent?.day || date
  ).format("DD MMM YYYY");
  const startHour = dayjs(date).format("HH:mm");
  const data = {
    serviceValue: selectedEvent?.serviceName || service?.value || service,
    customerName: customerName || selectedEvent?.title,
    worker: worker || selectedEvent?.worker,
    dateString,
    startHour: selectedEvent?.startHourStr || startHour,
    endHour: selectedEvent?.endHour || endHour,
    submitHandler,
    servicePrice: service?.price,
  };
  const columnsData = getSummaryColumnsData(data);

  return (
    <>
      {editing && (
        <BottomSheetToolBar
          deleteEventHandler={onDelete}
          editEventHandler={onEdit}
        />
      )}
      <SummaryViewContainer style={[shadowStyle, style]}>
        <RowContainerSpaceBetween>
          <SummaryColumn data={columnsData.firstCol} />
          <SummaryColumn data={columnsData.secondCol} />
        </RowContainerSpaceBetween>
        {children}
      </SummaryViewContainer>
    </>
  );
};

export default NewMeetingFormSummary;
