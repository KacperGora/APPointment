import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Calendar from "../NewMeetingFormCalendarStrip/NewMeetingFormSummary";
import ButtonBox from "../FormButtons/ButtonsBox";
import MeetingDetails from "../NewMeetingFormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
const FormCoreComponent = ({
  pickedDate,
  setPickedDate,
  availableHours,
  hourPressHandler,
  services,
  servicePressHandler,
  workers,
  workersPressHandler,
  setUserTypedLastName,
  setUserTypedName,
  startFullDate,
  pickedService,
  isOverlapped,
  submitHandler,
  endHour,
  worker,
}) => {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{
        marginHorizontal: 6,
        marginVertical: 12,
      }}
    >
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      <View>
        <FormSelectiveOptionsMap
          data={availableHours}
          pressHandler={hourPressHandler}
        />
        <FormSelectiveOptionsMap
          data={services}
          pressHandler={servicePressHandler}
        />
        <FormSelectiveOptionsMap
          data={workers}
          pressHandler={workersPressHandler}
        />
      </View>
      <TextInputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
      />
      <MeetingDetails
        date={new Date(startFullDate)}
        service={pickedService}
        endHour={endHour}
        worker={worker}
      />
    </KeyboardAwareScrollView>
  );
};
export default FormCoreComponent;
