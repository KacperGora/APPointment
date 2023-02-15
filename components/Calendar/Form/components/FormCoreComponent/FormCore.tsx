import React, { useRef } from "react";
import MeetingDetails from "../FormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import CalendarStripComponent from "../CalendarStrip/CalendarStrip";
import { Keyboard, LayoutAnimation, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const formTextInputsConfig = [
    {
      id: 1,
      placeholder: "Imię",
      autoCorrect: true,
      onChangeText: setUserTypedName,
      value: customerName.split(" ")[0].trim(),
      ref: firstNameInputRef,
      onSubmitEditing: () => lastNameInputRef?.current?.focus(),
    },
    {
      id: 2,
      placeholder: "Nazwisko",
      autoCorrect: false,
      onChangeText: setUserTypedLastName,
      value: customerName.split(" ")[1].trim(),
      ref: lastNameInputRef,
      onSubmitEditing: () => {
        LayoutAnimation.easeInEaseOut();
        Keyboard.dismiss();
      },
    },
  ];
  return (
    <View>
      <CalendarStripComponent date={pickedDate} setNewDate={setPickedDate} />
      <FormSelectiveOptionsMap data={selectMapConfig} />
      <TextInputs data={formTextInputsConfig} direction="row" />

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
