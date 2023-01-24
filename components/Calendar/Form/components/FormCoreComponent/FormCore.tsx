import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MeetingDetails from "../FormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import NoItemsScreen from "../../../../UI/NoMeetingsScreen/NoMeetingsScreen";
import CalendarStripComponent from "../CalendarStrip/CalendarStrip";

const FormCoreComponent = ({
  pickedDate,
  setPickedDate,
  setUserTypedLastName,
  setUserTypedName,
  startFullDate,
  pickedService,
  isOverlapped,
  submitHandler,
  endHour,
  worker,
  customerName,
  selectMapConfig,
}) => {
  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
      <CalendarStripComponent date={pickedDate} setNewDate={setPickedDate} />

      <>
        <FormSelectiveOptionsMap data={selectMapConfig} />
        <TextInputs
          setUserTypedLastName={setUserTypedLastName}
          setUserTypedName={setUserTypedName}
          fullName={customerName}
        />
        {isOverlapped ? null : (
          <MeetingDetails
            date={new Date(startFullDate)}
            service={pickedService}
            endHour={endHour}
            worker={worker}
            submitHandler={submitHandler}
            customerName={customerName}
          />
        )}
      </>
    </KeyboardAwareScrollView>
  );
};
export default FormCoreComponent;
