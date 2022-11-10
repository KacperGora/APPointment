import React, { FunctionComponent, useContext, useState } from "react";
import { Text, View, Alert, DefaultSectionT } from "react-native";
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
import { subHours } from "date-fns";
import useSetColorForEvent from "../../../hooks/calendar/useSetColorForEvent";

type RouteProps = {
  params: {
    date: {
      date: string;
      hour: number;
      minutes: number;
    };
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
  const dateString = route.params.date;
  const [pickedDate, setPickedDate] = useState(dateString.date);
  const [pickedHour, setPickedHour] = useState("");
  const [pickedService, setPickedService] = useState<ServiceDetails | any>({});
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const sortedEvents = useSortData();
  const color = useSetColorForEvent(pickedService);
  const fullDate = new Date(pickedDate + "T" + pickedHour + ":00.000Z");

  const data = {
    id: new Date().toISOString() + Math.random(),
    start: `${pickedDate} ${pickedHour}`,
    end: ` ${pickedDate} ${calculateTimeOfEnd(
      fullDate,
      pickedService?.duration
    ).toLocaleTimeString()}`,
    title: `${userTypedName}  ${userTypedLastName}`,
    summary: `${pickedService?.name} ${pickedService?.price}`,
    color: color,
    name: userTypedName,
    lastName: userTypedLastName,
    startDayStr: pickedDate,
    startHourStr: pickedHour,
    startFullDate: fullDate,
    serviceName: pickedService?.name,
    endFullDate: calculateTimeOfEnd(fullDate, pickedService?.duration),
    endHour: calculateTimeOfEnd(
      fullDate,
      pickedService?.duration
    ).toLocaleTimeString(),
    duration: pickedService?.duration,
    excludedTimes: calculateEventDuration(pickedService?.duration, fullDate),
  };

  const isOverlapped = useCheckOverlappingEvents(
    pickedDate,
    sortedEvents,
    data.duration,
    data.startFullDate
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
      <Text>{new Date(pickedDate).toLocaleDateString()} </Text>
      <View style={{ height: 250 }}>
        <HoursComponent pickedDay={pickedDate} setPickedHour={setPickedHour} />
        <Services getServices={setPickedService} />
      </View>
      <Inputs
        setUserTypedLastName={setUserTypedLastName}
        setUserTypedName={setUserTypedName}
      />
      {isOverlapped && (
        <WarningText>Termin zajety, wybierz proszę inny.</WarningText>
      )}
      {!isOverlapped && (
        <MeetingDetails date={fullDate} service={pickedService} />
      )}

      <ButtonBox disabled={isOverlapped} onPress={submitHandler} />
    </SafeAreaView>
  );
};

export default AddNewForm;
