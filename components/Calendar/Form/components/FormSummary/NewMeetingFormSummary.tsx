import React from "react";
import { MeetingDetailProps } from "../../../../../types";
import SummaryColumn from "./MeetingFormSummaryColumns/SummaryColumn";
import {
  RowContainerSpaceBetween,
  ScreenWidth,
  shadowStyle,
} from "../../../../shared";
import { SummaryViewContainer } from "../../style/Form.style";
import { getSummaryColumnsData } from "../../config/formConfig";
import dayjs from "dayjs";
import BottomSheetToolBar from "../../../../BottomSheet/BottomSheetToolBar";
import calculateTimeOfEnd from "../../../../../Utils/calculateTimeOfEnd";
import BottomSheetToolBarShortInformation from "../../../../BottomSheet/BottomSheetToolBarEditingEvent";
import { View } from "react-native";

const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  worker,
  submitHandler,
  customerName,
  selectedEvent,
  editing,
  onDelete,
  onEdit,
  editedEventDraft,
  eventMove,
  index,
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
      <View
        style={{
          flexDirection: eventMove || index === 0 ? "row-reverse" : "column",
          flex: 1,
        }}
      >
        {editing && (
          <BottomSheetToolBar
            deleteEventHandler={onDelete}
            editEventHandler={onEdit}
            data={data}
            editedEventDraft={editedEventDraft}
            eventMove={eventMove}
            index={index}
          />
        )}

        {eventMove || index === 0 ? (
          <BottomSheetToolBarShortInformation data={data} />
        ) : (
          <SummaryViewContainer style={[shadowStyle]}>
            <RowContainerSpaceBetween>
              <SummaryColumn data={columnsData.firstCol} />
              <SummaryColumn data={columnsData.secondCol} />
            </RowContainerSpaceBetween>
          </SummaryViewContainer>
        )}
      </View>
    </>
  );
};

export default NewMeetingFormSummary;
