import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Calendar from "../NewMeetingFormCalendarStrip/FormCalendarStrip";
import MeetingDetails from "../FormSummary/NewMeetingFormSummary";
import TextInputs from "../NewMeetingTextInputs/NewMeetingTextInputs";
import FormSelectiveOptionsMap from "../FormSelectiveOptionsMap/FormSelectiveOptionsMap";
import NoItemsScreen from "../../../../UI/NoMeetingsScreen/NoMeetingsScreen";

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
  const selectMapConfig = [
    { id: 1, data: availableHours, pressHandler: hourPressHandler },
    { id: 2, data: services, pressHandler: servicePressHandler },
    { id: 3, data: workers, pressHandler: workersPressHandler },
  ];
  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      
      {availableHours.length !== 0 ? (
        <>
          <View>
            {selectMapConfig.map((el) => {
              return (
                <FormSelectiveOptionsMap
                  key={el.id}
                  data={el.data}
                  pressHandler={el.pressHandler}
                />
              );
            })}
          </View>
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
      ) : (
        <NoItemsScreen
          heading={`Brak wolnych terminów`}
          description={"wybierz proszę inny dzień"}
        />
      )}
    </KeyboardAwareScrollView>
  );
};
export default FormCoreComponent;
