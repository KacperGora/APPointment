import React from "react";
import MeetingDetails from "../FormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import CalendarStripComponent from "../CalendarStrip/CalendarStrip";
import { View } from "react-native";

const FormCoreComponent = ({
  pickedDate,
  setPickedDate,
  setUserTypedLastName,
  setUserTypedName,
  startFullDate,
  pickedService,
  submitHandler,
  endHour,
  worker,
  customerName,
  selectMapConfig,
  userTypedName,
  userTypedLastName,
}) => {
  const renderSummaryCondition =
    userTypedLastName.trim().length !== 0 && userTypedName.trim().length !== 0;

  return (
    <View>
      <CalendarStripComponent date={pickedDate} setNewDate={setPickedDate} />
      <FormSelectiveOptionsMap data={selectMapConfig} />
      <TextInputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
        fullName={customerName}
      />

      {renderSummaryCondition && (
        <MeetingDetails
          date={new Date(startFullDate)}
          service={pickedService}
          endHour={endHour}
          worker={worker}
          submitHandler={submitHandler}
          customerName={customerName}
        />
      )}
    </View>
  );
};
export default FormCoreComponent;
