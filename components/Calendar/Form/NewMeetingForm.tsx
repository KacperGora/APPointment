import React, { useContext, useEffect, useState } from "react";
import { View, Alert, Dimensions, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/CalendarStore";
import useCheckOverlappingEvents from "../../../hooks/calendar/useCheckOverlappingEvents";
import WarningText from "./WarningText";
import useSetColorForEvent from "../../../hooks/calendar/useSetColorForEvent";
import getEventExcludedTimes from "../../../Utils/getEventExcludedTimes";
import { hours, salonWorkers } from "../../../data";
import {
  Hours,
  Meeting,
  Navigation,
  Service,
  WorkerDetails,
} from "../../../types";
import { SaloonContext } from "../../../store/SaloonStore";
import pickHandler from "../../../Utils/pickHandler";
import { servicesDetails } from "../../../data";
import useGetPickedValue from "../../../hooks/calendar/useGetPickedValue";
import useGetAvailableHours from "../../../hooks/calendar/useGetAvailableHours";
import dateFormatter from "../../../Utils/dateFormatter";
import emptyEventDataChecker from "../../../Utils/emptyEventDataChecker";
import Spinner from "../../UI/Spinner/Spinner";
import FormCoreComponent from "./FormCoreComponent/FormCore";
import AddNewCustomerBottomSheet from "../../Salon/SalonCustomers/AddNewCustomerBottomSheet";
import NoCustomerModal from "./NoCustomerModal/NoCustomerModal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

type RouteProps = {
  params: {
    date: string;
  };
};

const AddMeetingForm = () => {
  const navigation = useNavigation<Navigation>();
  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [dismissAddingCustomer, setDismissAddingCustomer] = useState(false);
  const [index, setIndex] = useState(0);
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString =
    route.params?.date || new Date().toISOString().split("T")[0];
  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState<Hours>();
  const [pickedService, setPickedService] = useState<Service>();
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const color = useSetColorForEvent(pickedService);
  const ctx = useContext(MeetingsContext);
  const isLoading = ctx.isLoading;
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const [services, setServices] = useState<Service[]>(servicesDetails);
  const [workers, setWorkers] = useState(salonWorkers);
  const customer = customers.filter((customer) =>
    customer.fullName
      .toLowerCase()
      .includes(
        userTypedName.toLowerCase() + " " + userTypedLastName.toLowerCase()
      )
  );

  const { endHour, endISODate, startFullDate, startISO } = dateFormatter(
    pickedDate,
    pickedHour,
    pickedService
  );

  useGetPickedValue(setPickedService, services);
  useGetPickedValue(setPickedHour, availableHours);
  useGetPickedValue(setPickedWorker, workers);

  const excludedTimes = getEventExcludedTimes(
    pickedService?.duration,
    new Date(startFullDate)
  );
  const fullName = `${userTypedName} ${userTypedLastName}`;
  const data: Meeting = {
    id: new Date(pickedDate)?.toISOString() + Math.random(),
    color: color,
    title: fullName,
    serviceName: pickedService?.value,
    serviceDuration: pickedService?.duration,
    servicePrice: +pickedService?.price?.split("PLN")[0],
    start: startISO,
    end: endISODate,
    startHourStr: pickedHour?.value,
    endHour: endHour.slice(0, 5),
    excludedTimes,
    worker: pickedWorker?.value,
  };

  const fromDataIsEmpty = emptyEventDataChecker(data);
  const result = useGetAvailableHours(pickedDate, pickedWorker?.value);
  useEffect(() => {
    setAvailableHours(result);
  }, [result]);

  const isOverlapped = useCheckOverlappingEvents(
    pickedDate,
    data?.serviceDuration,
    new Date(data?.start),
    pickedWorker?.value
  );

  const submitHandler = async () => {
    if (customer.length === 0 && !dismissAddingCustomer && !fromDataIsEmpty) {
      setModalShow(true);
      return;
    } else if (fromDataIsEmpty) {
      Alert.alert(
        "Nie wprowadzono danych",
        "Uzupełnij brakujące dane i spróbuj ponownie."
      );
      return;
    } else {
      ctx?.addMeeting(data, pickedDate.split("T")[0]);

      const customerRef = doc(db, "customers", fullName);

      await updateDoc(customerRef, {
        meetings: arrayUnion(data),
      });

      !isLoading && navigation.navigate("Home");
    }
  };

  const hourPressHandler = (index: number) => {
    pickHandler(index, availableHours, setAvailableHours);
  };
  const servicePressHandler = (index: number) => {
    pickHandler(index, services, setServices);
  };
  const workersPressHandler = (index: number) => {
    pickHandler(index, workers, setWorkers);
  };
  const bottomSheetHandler = () => {
    setIndex(1);
    setBottomSheetShown(true);
    setModalShow(false);
  };
  const cancelButtonPressHandler = () => {
    setModalShow(!modalShow);
    setDismissAddingCustomer(true);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <View>
          <FormCoreComponent
            availableHours={availableHours}
            hourPressHandler={hourPressHandler}
            pickedDate={pickedDate}
            servicePressHandler={servicePressHandler}
            services={services}
            setPickedDate={setPickedDate}
            setUserTypedLastName={setUserTypedLastName}
            setUserTypedName={setUserTypedName}
            workers={workers}
            workersPressHandler={workersPressHandler}
            pickedService={pickedService}
            startFullDate={startFullDate}
            isOverlapped={isOverlapped}
            submitHandler={submitHandler}
            endHour={endHour}
            worker={pickedWorker?.value}
            customerName={fullName}
          />
          {bottomSheetShown && (
            <AddNewCustomerBottomSheet
              index={index}
              setIndex={setIndex}
              customerName={fullName}
            />
          )}
          {isOverlapped && availableHours.length !== 0 ? (
            <WarningText>Termin zajety, wybierz proszę inny.</WarningText>
          ) : null}
        </View>
      )}
      {modalShow ? (
        <NoCustomerModal
          setModalShow={setModalShow}
          modalShow={modalShow}
          showBottomSheetHandler={bottomSheetHandler}
          cancelButtonPressHandler={cancelButtonPressHandler}
        />
      ) : null}
    </View>
  );
};

export default AddMeetingForm;
const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  optionsContainer: {
    backgroundColor: "white",
    flex: 1,
    margin: 12,
    width: Dimensions.get("screen").width - 24,
  },
});
