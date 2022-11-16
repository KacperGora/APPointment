import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Calendar from "./Calendar";
import calculateTimeOfEnd from "../../../Utils/calculateTimeOfEnd";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/store";
import MeetingDetails from "./MeetingDetails";
import ButtonBox from "./ButtonsBox";
import calculateEventDuration from "../../../Utils/calculateEventDuration";
import HoursComponent from "./Hours";
import useCheckOverlappingEvents from "../../../hooks/calendar/useCheckOverlappingEvents";
import Services from "./Services";
import WarningText from "./WarningText";
import Inputs from "./Inputs";
import useSortData from "../../../hooks/calendar/useSortData";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import useSetColorForEvent from "../../../hooks/calendar/useSetColorForEvent";
import { db } from "../../../firebase/firebase";
import { EventItem } from "@howljs/calendar-kit";

import TimelineWorkerPicker from "../TimeLine/TimelineWorkerPicker";
import { colors } from "../../colors";

type RouteProps = {
  params: {
    date: string;
  };
};
interface Navigate {
  navigate: (destination: string) => void;
}
type ServiceDetails = {
  duration: number;
  name: string;
  price: string;
};
const AddNewForm = () => {
  const ctx = useContext(MeetingsContext);

  const navigation = useNavigation<Navigate>();
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString = route.params?.date;

  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState("");
  const [pickedService, setPickedService] = useState<ServiceDetails | any>({});
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const sortedEvents = useSortData();
  const [worker, setWorker] = useState("Justi");

  const color = useSetColorForEvent(pickedService);
  const fullDate = pickedDate + "T" + pickedHour + ":00.000Z";
  const endFullDate =
    pickedDate +
    "T" +
    calculateTimeOfEnd(
      new Date(fullDate),
      pickedService?.duration
    ).toLocaleTimeString() +
    ".000Z";
  const endHour = calculateTimeOfEnd(
    new Date(fullDate),
    pickedService?.duration
  ).toLocaleTimeString();
  const excludedTimes = calculateEventDuration(
    pickedService?.duration,
    new Date(fullDate)
  );
  const data: EventItem = {
    id: new Date(pickedDate)?.toISOString() + Math.random(),
    color: color,
    title: `${userTypedName}  ${userTypedLastName}`,
    serviceName: pickedService?.name,
    duration: pickedService?.duration,
    start: fullDate,
    end: endFullDate,
    startHourStr: pickedHour,
    endHour,
    excludedTimes,
    worker,
  };

  const isOverlapped = useCheckOverlappingEvents(
    pickedDate,
    sortedEvents,
    data.duration,
    new Date(data.start),
    worker
  );

  const isEmpty = Object.values(data).some(
    (x) => x === undefined || x === "" || x === "Invalid Date"
  );

  const submitHandler = () => {
    ctx?.addMeeting(data, pickedDate.split("T")[0]);

    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      <View style={{ height: 250 }}>
        <HoursComponent pickedDay={pickedDate} setPickedHour={setPickedHour} />
        <Services getServices={setPickedService} />
      </View>
      <Inputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
      />
      <View style={styles.workerPickerContainer}>
        <Text style={styles.workerPickerText}>Pracownik:</Text>
        <TimelineWorkerPicker setWorker={setWorker} addingEvent />
      </View>
      {isOverlapped && (
        <WarningText>Termin zajety, wybierz proszę inny.</WarningText>
      )}
      {!isOverlapped && (
        <MeetingDetails date={new Date(fullDate)} service={pickedService} />
      )}

      <ButtonBox disabled={isOverlapped} onPress={submitHandler} />
    </SafeAreaView>
  );
};

export default AddNewForm;
const styles = StyleSheet.create({
  workerPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  workerPickerText: {
    fontWeight: "500",
    marginRight: 20,
  },
});
