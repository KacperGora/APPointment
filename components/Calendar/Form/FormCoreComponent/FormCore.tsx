import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Calendar from "../NewMeetingFormCalendarStrip/NewMeetingFormSummary";
import MeetingDetails from "../NewMeetingFormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import NoItemsScreen from "../../Agenda/NoItemsScreen";

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
  customerName,
}) => {
  const [showCustomerName, setShowCustomerName] = useState(false);
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{
        marginHorizontal: 6,
        marginVertical: 12,
      }}
    >
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      {availableHours.length !== 0 ? (
        <>
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
            setShowCustomerName={setShowCustomerName}
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
              showCustomerName={showCustomerName}
            />
          )}
        </>
      ) : (
        <View style={{ alignItems: "center", marginTop: 200 }}>
          <NoItemsScreen
            heading={`Brak wolnych terminów`}
            description={"wybierz proszę inny dzień"}
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};
export default FormCoreComponent;
