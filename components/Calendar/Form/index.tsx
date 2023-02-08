import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, LayoutAnimation } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
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
import { dateFormatter } from "../../../Utils/formatUtilis";
import emptyEventDataChecker from "../../../Utils/emptyEventDataChecker";
import Spinner from "../../UI/Spinner/Spinner";
import FormCoreComponent from "./components/FormCoreComponent/FormCore";
import NoCustomerModal from "./components/NoCustomerModal/NoCustomerModal";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";
import AddNewCustomerForm from "../../Salon/SalonCustomers/components/AddNewCustomerForm";
import { Container } from "../../shared";
import getAvHours from "./hooks/useGetAvailableHours";
import pickHandler from "../../../Utils/pickHandler";
import { v4 } from "uuid";
import useFirebase from "../../../hooks/useFirebase";
import { getSelectiveOptions } from "./config/formConfig";
import { SaloonContext } from "../../../store/SaloonStore";

const MeetingForm: React.FC<MeetingFormProps> = ({
  timelineDate,
  onCloseBottomSheet,
  selectedEvent,
}) => {
  const salonCtx = useContext(SaloonContext);
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString = route.params?.date || timelineDate;
  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [dismissAddingCustomer, setDismissAddingCustomer] = useState(false);
  const [index, setIndex] = useState(0);
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const [services, setServices] = useState<SelectiveOptions[]>(servicesDetails);
  const [workers, setWorkers] = useState(salonWorkers);
  const [pickedDate, setPickedDate] = useState(dateString);

  const [pickedHour, setPickedHour] = useState(availableHours[0]);
  const [pickedService, setPickedService] = useState<SelectiveOptions>(null);
  const [pickedWorker, setPickedWorker] = useState<WorkerDetails>();
  const [userTypedName, setUserTypedName] = useState(
    selectedEvent?.title.split(" ")[0] || ""
  );
  const [userTypedLastName, setUserTypedLastName] = useState(
    selectedEvent?.title.split(" ")[1] || ""
  );
  const customerFullName = `${userTypedName} ${userTypedLastName}`;
  const customers = salonCtx.customers;
  const customer: NewUserData = customers[customerFullName];
  const color = useSetColorForEvent(pickedService);

  const { endHour, startFullDateISO, endFullDateISO, startFullDate, day } =
    dateFormatter(pickedDate, pickedHour, pickedService, availableHours);
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

  const { error, isLoading, makeFirebaseCall } = useFirebase("meetings");
  const fromDataIsEmpty = emptyEventDataChecker(data);

  const res = getAvHours(
    pickedDate,
    data?.worker,
    pickedService,
    selectedEvent
  );

  useEffect(() => {
    setAvailableHours(res);
  }, [pickedService, pickedDate, pickedWorker, selectedEvent]);

  useEffect(() => {
    const pH = [...availableHours].filter((value) => value.isActive)[0];
    setPickedHour(pH);
    const pW = [...workers].filter((value) => value.isActive)[0];
    setPickedWorker(pW);
    const pS = [...services].filter((value) => value.isActive)[0];
    setPickedService(pS);
  }, [availableHours, workers, services]);

  const submitHandler = async () => {
    if (!!selectedEvent) {
      data.id = selectedEvent.id;
      makeFirebaseCall("edit", data, selectedEvent.day);
      !isLoading && onCloseBottomSheet();
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
        await makeFirebaseCall("add", data);
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
  const onCloseBottomSheetHandler = () => {
    setIndex(0);
    setBottomSheetShown(false);
  };
  useEffect(() => {
    !!selectedEvent && setPickedDate(selectedEvent?.day);
  }, [selectedEvent]);
  return (
    <Container>
      {isLoading ? (
        <Spinner borderWidth={5} size={50} />
      ) : (
        <FormCoreComponent
          selectMapConfig={selectMapConfig}
          pickedDate={pickedDate}
          pickedService={pickedService}
          startFullDate={startFullDateISO}
          customerName={customerFullName}
          worker={pickedWorker?.value}
          endHour={endHour}
          setPickedDate={setPickedDate}
          setUserTypedLastName={setUserTypedLastName}
          setUserTypedName={setUserTypedName}
          submitHandler={submitHandler}
          userTypedName={userTypedName}
          userTypedLastName={userTypedLastName}
        />
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
        <BottomSheetForm
          index={index}
          setIndex={setIndex}
          onCloseBottomSheet={onCloseBottomSheetHandler}
        >
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
