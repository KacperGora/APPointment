import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MeetingDetails from "../FormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import NoItemsScreen from "../../../../UI/NoMeetingsScreen/NoMeetingsScreen";
import CalendarStripComponent from "../CalendarStrip/CalendarStrip";
import { View } from "react-native";

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
  const [showSummary, setShowSummary] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <CalendarStripComponent date={pickedDate} setNewDate={setPickedDate} />
      <FormSelectiveOptionsMap data={selectMapConfig} />
      <TextInputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
        fullName={customerName}
        setShowSummary={setShowSummary}
      />
      {showSummary && (
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
//   <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
// </KeyboardAwareScrollView>
