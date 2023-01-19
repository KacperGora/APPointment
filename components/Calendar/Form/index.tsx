import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, TextStyle } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/CalendarStore";
import useCheckOverlappingEvents from "./hooks/useCheckOverlappingEvents";
import useSetColorForEvent from "../Timeline/hooks/useSetColorForEvent";
import getEventExcludedTimes from "../../../Utils/getEventExcludedTimes";
import { hours, salonWorkers } from "../../../data";
import {
  Hours,
  Meeting,
  RouteProps,
  SelectiveOptions,
  WorkerDetails,
} from "../../../types";
import { SaloonContext } from "../../../store/SaloonStore";
import { servicesDetails } from "../../../data";
import useGetPickedValue from "../../../hooks/calendar/useGetPickedValue";
import { dateFormatter, ISOSplitter } from "../../../Utils/formatUtilis";
import emptyEventDataChecker from "../../../Utils/emptyEventDataChecker";
import Spinner from "../../UI/Spinner/Spinner";
import FormCoreComponent from "./components/FormCoreComponent/FormCore";
import NoCustomerModal from "./components/NoCustomerModal/NoCustomerModal";
import useAddMeetingForCustomer from "./hooks/useAddMeetingForCustomer";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";
import AddNewCustomerForm from "../../Salon/SalonCustomers/AddNewCustomerForm";
import InformationText from "../../UI/InformationText/InformationText";
import { colors } from "../../colors";
import { Container } from "../../shared";
import getAvHours from "./hooks/useGetAvailableHours";
import pickHandler from "../../../Utils/pickHandler";
const MeetingForm = ({ timelineDate, onCloseBottomSheet }) => {
  const ctx = useContext(MeetingsContext);
  const isLoading = ctx.isLoading;
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [dismissAddingCustomer, setDismissAddingCustomer] = useState(false);
  const [index, setIndex] = useState(0);
  const route = useRoute<RouteProp<RouteProps>>();
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const [services, setServices] = useState<SelectiveOptions[]>(servicesDetails);
  const [workers, setWorkers] = useState(salonWorkers);
  const dateString = route.params?.date || ISOSplitter(timelineDate, 0);
  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState(availableHours[0]);
  const [pickedService, setPickedService] = useState<SelectiveOptions>();
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const color = useSetColorForEvent(pickedService);

  const customerFullName = `${userTypedName} ${userTypedLastName}`;

  const customer = customers.filter((customer) =>
    customer.fullName
      .toLowerCase()
      .includes(
        userTypedName.toLowerCase() + " " + userTypedLastName.toLowerCase()
      )
  );

  const { endHour, startFullDateISO, endFullDateISO, startFullDate, day } =
    dateFormatter(pickedDate, pickedHour, pickedService, availableHours);

  const data: Meeting = {
    id: new Date(pickedDate)?.toISOString() + Math.random(),
    color: color,
    title: customerFullName,
    serviceName: pickedService?.value,
    serviceDuration: pickedService?.duration,
    servicePrice: +pickedService?.price.split("PLN")[0],
    start: startFullDateISO,
    end: endFullDateISO,
    startHourStr: pickedHour?.value,
    endHour: endHour,
    excludedTimes: getEventExcludedTimes(
      pickedService?.duration,
      startFullDate
    ),
    worker: pickedWorker?.value,
    height: 50,
    name: customerFullName,
    day: day,
  };
  console.log(data);
  const fromDataIsEmpty = emptyEventDataChecker(data);

  const res = getAvHours(pickedDate, data?.worker, pickedService);

  useEffect(() => {
    setAvailableHours(res);
  }, [pickedService, pickedDate, pickedWorker]);

  const isOverlapped = useCheckOverlappingEvents(
    pickedDate,
    data?.serviceDuration,
    new Date(data?.start),
    pickedWorker?.value
  );
  useGetPickedValue(setPickedService, services);
  useGetPickedValue(setPickedHour, availableHours);
  useGetPickedValue(setPickedWorker, workers);

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
  const selectiveOptionsPressHandler = (
    index: number,
    state: SelectiveOptions[],
    setState: SetStateAction<any>
  ) => {
    pickHandler(index, state, setState);
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
  const informationTextStyle: TextStyle = {
    color: colors.primary,
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 18,
  };

  const selectMapConfig = [
    {
      id: 3,
      data: workers,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, workers, setWorkers),
      render: true,
    },
    {
      id: 2,
      data: services,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, services, setServices),
      render: true,
    },
    {
      id: 1,
      data: availableHours,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, availableHours, setAvailableHours),
      render: pickedService ? true : false,
    },
  ];
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FormCoreComponent
            selectMapConfig={selectMapConfig}
            pickedDate={pickedDate}
            pickedService={pickedService}
            startFullDate={startFullDateISO}
            isOverlapped={isOverlapped}
            customerName={customerFullName}
            worker={pickedWorker?.value}
            endHour={endHour.slice(0, 5)}
            setPickedDate={setPickedDate}
            setUserTypedLastName={setUserTypedLastName}
            setUserTypedName={setUserTypedName}
            submitHandler={submitHandler}
          />

          {isOverlapped && pickedService ? (
            <InformationText stylingProps={informationTextStyle}>
              Termin zajety, wybierz proszę inny.
            </InformationText>
          ) : null}
        </>
      )}
      {modalShow ? (
        <NoCustomerModal
          setModalShow={setModalShow}
          modalShow={modalShow}
          showBottomSheetHandler={bottomSheetHandler}
          cancelButtonPressHandler={cancelButtonPressHandler}
        />
      ) : null}
      {bottomSheetShown ? (
        <BottomSheetForm index={index} setIndex={setIndex}>
          <AddNewCustomerForm
            customerName={customerFullName}
            hideBottomModal={hideBottomModalHandler}
          />
        </BottomSheetForm>
      ) : null}
    </Container>
  );
};

export default MeetingForm;
