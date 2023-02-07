import React from "react";
import { MeetingDetailProps } from "../../../../../types";
import SummaryColumn from "./MeetingFormSummaryColumns/SummaryColumn";
import { RowContainerSpaceBetween, shadowStyle } from "../../../../shared";
import { SummaryViewContainer } from "../../style/Form.style";
import { getSummaryColumnsData } from "../../config/formConfig";
import dayjs from "dayjs";
import BottomSheetToolBar from "../../../../BottomSheet/BottomSheetToolBar";
import calculateTimeOfEnd from "../../../../../Utils/calculateTimeOfEnd";

const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  worker,
  submitHandler,
  customerName,
  style,
  selectedEvent,
  editing,
  onDelete,
  onEdit,
  editedEventDraft,
}) => {
  const calculatedTime = calculateTimeOfEnd(date, service?.duration);

  const dateString = dayjs(
    editedEventDraft?.start || selectedEvent?.day || date
  ).format("DD MMM YYYY");
  const startHour = dayjs(
    editedEventDraft?.start || selectedEvent?.start || date
  ).format("HH:mm");
  const endHour = dayjs(
    editedEventDraft?.end || selectedEvent?.end || calculatedTime
  ).format("HH:mm");

  const data = {
    serviceValue: selectedEvent?.serviceName || service?.value || service,
    customerName: customerName || selectedEvent?.title,
    worker: worker || selectedEvent?.worker,
    dateString,
    startHour,
    endHour: !!selectedEvent ? endHour : calculatedTime,
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
          data={data}
          editedEventDraft={editedEventDraft}
        />
      )}

      {!!editedEventDraft ? null : (
        <SummaryViewContainer style={[shadowStyle, style]}>
          <RowContainerSpaceBetween>
            <SummaryColumn data={columnsData.firstCol} />
            <SummaryColumn data={columnsData.secondCol} />
          </RowContainerSpaceBetween>
        </SummaryViewContainer>
      )}
    </>
  );
};

export default NewMeetingFormSummary;
