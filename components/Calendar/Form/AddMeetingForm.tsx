import React, { useContext, useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import Calendar from "./Calendar";
import calculateTimeOfEnd from "../../../Utils/calculateTimeOfEnd";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/CalendarStore";
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
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import * as Progress from "react-native-progress";
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
  const endISODate = new Date(subHours(new Date(endFullDate), 1)).toISOString();

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
    servicePrice: +pickedService?.price?.split("PLN")[0],
    start: startISO,
    end: endISODate,
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

  const isEmpty =
    userTypedName.trim().length === 0 ||
    (userTypedLastName.trim().length === 0 &&
      Object.values(data).some(
        (x) => x === undefined || x.length === 0 || x === "Invalid Date"
      ));

  const isLoading = ctx.isLoading;
  const submitHandler = () => {
    if (isEmpty) {
      Alert.alert(
        "Nie wprowadzono danych",
        "Uzupełnij brakujące dane i spróbuj ponownie."
      );
      return;
    } else {
      ctx?.addMeeting(data, pickedDate.split("T")[0]);

      !isLoading && navigation.navigate("Home");
    }
  };

  return (
    <>
      {isLoading ? (
        <Progress.Circle
          size={150}
          indeterminate={true}
          color={colors.primary}
          borderWidth={10}
        />
      ) : (
        <>
          <Calendar date={pickedDate} setNewDate={setPickedDate} />
          <View>
            <HoursComponent
              pickedDay={pickedDate}
              setPickedHour={setPickedHour}
              worker={pickedWorker?.name}
            />
            <Services getPickedService={setPickedService} />
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
      )}
    </>
  );
};

export default AddMeetingForm;
