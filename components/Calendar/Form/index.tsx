import React, { useContext, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/CalendarStore";
import useCheckOverlappingEvents from "../Timeline/hooks/useCheckOverlappingEvents";
import useSetColorForEvent from "../../../hooks/calendar/useSetColorForEvent";
import getEventExcludedTimes from "../../../Utils/getEventExcludedTimes";
import { hours, salonWorkers } from "../../../data";
import {
  Hours,
  Meeting,
  SelectiveOptions,
  WorkerDetails,
} from "../../../types";
import { SaloonContext } from "../../../store/SaloonStore";
import pickHandler from "../../../Utils/pickHandler";
import { servicesDetails } from "../../../data";
import useGetPickedValue from "../../../hooks/calendar/useGetPickedValue";
import useGetAvailableHours from "../../../hooks/calendar/useGetAvailableHours";
import { dateFormatter, ISOSplitter } from "../../../Utils/formatUtilis";
import emptyEventDataChecker from "../../../Utils/emptyEventDataChecker";
import Spinner from "../../UI/Spinner/Spinner";
import FormCoreComponent from "./components/FormCoreComponent/FormCore";
import NoCustomerModal from "./components/NoCustomerModal/NoCustomerModal";
import useAddMeetingForCustomer from "../../../hooks/calendar/useAddMeetingForCustomer";
import BottomSheetForm from "../../BottomSheet/BottomSheetForm";
import AddNewCustomerForm from "../../Salon/SalonCustomers/AddNewCustomerForm";
import InformationText from "../../UI/InformationText/InformationText";
import { colors } from "../../colors";
import { Container } from "../../shared";

type RouteProps = {
  params: {
    date: string;
    onCloseBottomSheet: () => void;
  };
};

const MeetingForm = ({ timelineDate, onCloseBottomSheet }) => {
  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [dismissAddingCustomer, setDismissAddingCustomer] = useState(false);
  const [index, setIndex] = useState(0);
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString = route.params?.date || ISOSplitter(timelineDate, 0);
  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState<Hours>();
  const [pickedService, setPickedService] = useState<SelectiveOptions>();
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const color = useSetColorForEvent(pickedService);
  const ctx = useContext(MeetingsContext);
  const isLoading = ctx.isLoading;

  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const [services, setServices] = useState<SelectiveOptions[]>(servicesDetails);
  const [workers, setWorkers] = useState(salonWorkers);

  const customerFullName = `${userTypedName} ${userTypedLastName}`;

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

  const data: Meeting = {
    id: new Date(pickedDate)?.toISOString() + Math.random(),
    color: color,
    title: customerFullName,
    serviceName: pickedService?.value,
    serviceDuration: pickedService?.duration,
    servicePrice: +pickedService?.price?.split("PLN")[0],
    start: startISO,
    end: endISODate,
    startHourStr: pickedHour?.value,
    endHour: endHour.slice(0, 5),
    excludedTimes: getEventExcludedTimes(
      pickedService?.duration,
      new Date(startFullDate)
    ),
    worker: pickedWorker?.value,
    height: 50,
    name: customerFullName,
    day: ISOSplitter(startISO, 0),
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
      ctx?.addMeeting(data, ISOSplitter(pickedDate, 0));
      useAddMeetingForCustomer(customerFullName, data);
      onCloseBottomSheet();
      !isLoading && setIndex(0);
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
  const hideBottomModalHandler = () => {
    setBottomSheetShown(false);
  };
  const informationTextStyle = {
    color: colors.primary,
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 18,
  };
  return (
    <Container>
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
            endHour={endHour.slice(0, 5)}
            worker={pickedWorker?.value}
            customerName={customerFullName}
          />

          {isOverlapped ? (
            <InformationText stylingProps={informationTextStyle}>
              Termin zajety, wybierz proszę inny.
            </InformationText>
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
      {bottomSheetShown && (
        <BottomSheetForm index={index} setIndex={setIndex}>
          <AddNewCustomerForm
            customerName={customerFullName}
            hideBottomModal={hideBottomModalHandler}
          />
        </BottomSheetForm>
      )}
    </Container>
  );
};

export default MeetingForm;
