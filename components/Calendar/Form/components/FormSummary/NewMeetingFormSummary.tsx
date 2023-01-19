import React from "react";
import { MeetingDetailProps } from "../../../../../types";
import SummaryColumn from "./MeetingFormSummaryColumns/SummaryColumn";
import { RowContainerSpaceBetween, shadowStyle } from "../../../../shared";
import { SummaryViewContainer } from "../../style/Form.style";
import { getSummaryColumnsData } from "../../config/formConfig";
import dayjs from "dayjs";

const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  endHour,
  worker,
  submitHandler,
  customerName,
}) => {
  const dateString = dayjs(date).format("DD MMM YYYY");
  const startHour = dayjs(date).format("HH:mm");

  const data = {
    serviceValue: service?.value,
    customerName: customerName,
    worker: worker,
    dateString,
    startHour,
    endHour,
    submitHandler,
    servicePrice: service?.price,
  };
  const columnsData = getSummaryColumnsData(data);

  return (
    <SummaryViewContainer style={shadowStyle}>
      <RowContainerSpaceBetween>
        <SummaryColumn data={columnsData.firstCol} />
        <SummaryColumn data={columnsData.secondCol} />
      </RowContainerSpaceBetween>
    </SummaryViewContainer>
  );
};

export default NewMeetingFormSummary;
