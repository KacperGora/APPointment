import React, { useContext, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import Calendar from "./Calendar";
import calculateTimeOfEnd from "../../../Utils/calculateTimeOfEnd";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/store";
import MeetingDetails from "./MeetingDetails";
import ButtonBox from "./ButtonsBox";
import HoursComponent from "./Hours";
import useCheckOverlappingEvents from "../../../hooks/calendar/useCheckOverlappingEvents";
import Services from "./Services";
import WarningText from "./WarningText";
import Inputs from "./Inputs";
import useSortData from "../../../hooks/calendar/useSortData";
import useSetColorForEvent from "../../../hooks/calendar/useSetColorForEvent";
import { EventItem } from "@howljs/calendar-kit";
import { subHours } from "date-fns";
import Workers from "./Workers";
import getEventExcludedTimes from "../../../Utils/getEventExcludedTimes";

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
type WorkerDetails = {
  name: string;
  isActive: boolean;
};
const AddMeetingForm = () => {
  const ctx = useContext(MeetingsContext);
  const navigation = useNavigation<Navigate>();
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString = route.params?.date;
  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState("09:00");
  const [pickedService, setPickedService] = useState<ServiceDetails | any>({});
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const sortedEvents = useSortData();

  const color = useSetColorForEvent(pickedService);

  const startFullDate = pickedDate + "T" + pickedHour + ":00.000Z";
  const startISO = new Date(subHours(new Date(startFullDate), 1)).toISOString();

  const endHour = calculateTimeOfEnd(
    subHours(new Date(startFullDate), 1),
    pickedService?.duration
  );

  const endFullDate = pickedDate + "T" + endHour + ".000Z";
  const endISO = new Date(subHours(new Date(endFullDate), 1)).toISOString();

  const excludedTimes = getEventExcludedTimes(
    pickedService?.duration,
    new Date(startFullDate)
  );
  const data: EventItem = {
    id: new Date(pickedDate)?.toISOString() + Math.random(),
    color: color,
    title: `${userTypedName}  ${userTypedLastName}`,
    serviceName: pickedService?.name,
    serviceDuration: pickedService?.duration,
    start: startISO,
    end: endISO,
    startHourStr: pickedHour,
    endHour: endHour.slice(0, 5),
    excludedTimes,
    worker: pickedWorker?.name,
  };

  const isOverlapped = useCheckOverlappingEvents(
    pickedDate,
    sortedEvents,
    data?.serviceDuration,
    new Date(data?.start),
    pickedWorker?.name
  );

  const isEmpty = Object.values(data).some(
    (x) => x === undefined || x === "" || x === "Invalid Date"
  );

  const submitHandler = () => {
    if (isEmpty) {
      Alert.alert(
        "Nie wprowadzono danych",
        "Uzupełnij brakujące dane i spróbuj ponownie."
      );
      return;
    } else {
      ctx?.addMeeting(data, pickedDate.split("T")[0]);
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      <View style={{ height: 250 }}>
        <HoursComponent
          pickedDay={pickedDate}
          setPickedHour={setPickedHour}
          worker={pickedWorker?.name}
        />
        <Services getServices={setPickedService} />
      </View>
      <Inputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
      />
      <Workers getWorkers={setPickedWorker} />
      {isOverlapped ? (
        <WarningText>Termin zajety, wybierz proszę inny.</WarningText>
      ) : null}
      {!isOverlapped && !isEmpty ? (
        <MeetingDetails
          date={new Date(startFullDate)}
          service={pickedService}
        />
      ) : null}
      <ButtonBox disabled={isOverlapped} onPress={submitHandler} />
    </>
  );
};

export default AddMeetingForm;
