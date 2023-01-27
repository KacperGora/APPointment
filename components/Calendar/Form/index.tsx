import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, LayoutAnimation, TextStyle } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/CalendarStore";
import useCheckOverlappingEvents from "./hooks/useCheckOverlappingEvents";
import useSetColorForEvent from "../Timeline/hooks/useSetColorForEvent";
import getEventExcludedTimes from "../../../Utils/getEventExcludedTimes";
import { hours, salonWorkers } from "../../../data";
import {
  Hours,
  Meeting,
  MeetingFormProps,
  NewUserData,
  RouteProps,
  SelectiveOptions,
  WorkerDetails,
} from "../../../types";
import { servicesDetails } from "../../../data";
import useGetPickedValue from "../../../hooks/calendar/useGetPickedValue";
import { dateFormatter } from "../../../Utils/formatUtilis";
import emptyEventDataChecker from "../../../Utils/emptyEventDataChecker";
import Spinner from "../../UI/Spinner/Spinner";
import FormCoreComponent from "./components/FormCoreComponent/FormCore";
import NoCustomerModal from "./components/NoCustomerModal/NoCustomerModal";
import useAddMeetingForCustomer from "./hooks/useAddMeetingForCustomer";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";
import AddNewCustomerForm from "../../Salon/SalonCustomers/components/AddNewCustomerForm";
import InformationText from "../../UI/InformationText/InformationText";
import { colors } from "../../colors";
import { Container } from "../../shared";
import getAvHours from "./hooks/useGetAvailableHours";
import pickHandler from "../../../Utils/pickHandler";
import { v4 } from "uuid";
import dayjs from "dayjs";
import useFirebase from "../../../hooks/useFirebase";
import { getSelectiveOptions } from "./config/formConfig";
import { SaloonContext } from "../../../store/SaloonStore";

const MeetingForm: React.FC<MeetingFormProps> = ({
  timelineDate,
  onCloseBottomSheet,
  worker,
  service,
  editing,
  editedEventDraft,
  selectedEvent,
  setEditingFinished,
  setIndexForm,
}) => {
  const ctx = useContext(MeetingsContext);

  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [dismissAddingCustomer, setDismissAddingCustomer] = useState(false);
  const [index, setIndex] = useState(0);
  const route = useRoute<RouteProp<RouteProps>>();
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const [services, setServices] = useState<SelectiveOptions[]>(servicesDetails);
  const [workers, setWorkers] = useState(salonWorkers);
  const dateString = route.params?.date || timelineDate;

  const [pickedDate, setPickedDate] = useState(dateString);
  const [pickedHour, setPickedHour] = useState(availableHours[0]);
  const [pickedService, setPickedService] = useState<SelectiveOptions>();
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const [userTypedName, setUserTypedName] = useState("");
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const [userTypedLastName, setUserTypedLastName] = useState("");

  const color = useSetColorForEvent(pickedService);
  useEffect(() => {
    setPickedService(services.find((el) => el.value === service));
    setPickedWorker(workers.find((el) => el.value === worker));
  }, [worker, service]);

  const customerFullName = `${userTypedName} ${userTypedLastName}`;
  const customer: NewUserData = customers[customerFullName];
  const { endHour, startFullDateISO, endFullDateISO, startFullDate, day } =
    dateFormatter(pickedDate, pickedHour, pickedService, availableHours);
  console.log(customer);
  console.log(customers[customerFullName]);
  const data: Meeting = {
    id: v4(),
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
  const { error, isLoading, makeFirebaseCall } = useFirebase(
    selectedEvent,
    pickedDate,
    data
  );
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
    if (editing) {
      setEditingFinished(false),
        setIndexForm(0),
        await makeFirebaseCall("edit");
      setEditingFinished(true);
      // const editedLength = dayjs(editedEventDraft.end).diff(
      //   editedEventDraft.start,
      //   "minutes"
      // );
      // const editedMeeting: Meeting = { ...editedEventDraft };
      // editedMeeting.day = dayjs(editedEventDraft.start).format("YYYY-MM-DD");
      // editedMeeting.endHour = dayjs(editedEventDraft.end).format("HH:mm");
      // editedMeeting.startHourStr = dayjs(editedEventDraft.start).format(
      //   "HH:mm"
      // );
      // editedMeeting.serviceName = data.serviceName;
      // editedMeeting.serviceDuration = data.serviceDuration;
      // editedMeeting.servicePrice = data.servicePrice;
      // editedMeeting.excludedTimes = getEventExcludedTimes(
      //   editedLength,
      //   dayjs(editedEventDraft.start).add(1, "hour").toDate()
      // );
    } else {
      if (
        customer === undefined &&
        !dismissAddingCustomer &&
        !fromDataIsEmpty
      ) {
        setModalShow(true);
        return;
      } else if (fromDataIsEmpty) {
        Alert.alert(
          "Nie wprowadzono danych",
          "Uzupełnij brakujące dane i spróbuj ponownie."
        );
        return;
      } else {
        ctx?.addMeeting(data, pickedDate);
        useAddMeetingForCustomer(customer, data);
        onCloseBottomSheet();
        !isLoading && setIndex(0);
      }
    }
  };

  const selectiveOptionsPressHandler = (
    index: number,
    state: SelectiveOptions[],
    setState: SetStateAction<any>
  ) => {
    LayoutAnimation.easeInEaseOut();
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
  const selectiveOptionsData = {
    workers,
    services,
    availableHours,
    selectiveOptionsPressHandler,
    setWorkers,
    setServices,
    setAvailableHours,
    pickedService,
  };
  const selectMapConfig = getSelectiveOptions(selectiveOptionsData);

  return (
    <Container>
      {isLoading ? (
        <Spinner borderWidth={5} size={50} />
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
            endHour={endHour}
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
