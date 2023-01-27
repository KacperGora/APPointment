import React, { useEffect, useMemo, useRef, useState } from "react";
import useGetCurrentCustomer from "../../../../hooks/useGetCurrentCustomer";
import { phoneNumberFormatter } from "../../../../Utils/formatUtilis";
import getClosestPastCustomerMeeting from "../../../../hooks/Customer/getClosestPastCustomerMeeting";
import NewMeetingFormSummary from "../../Form/components/FormSummary/NewMeetingFormSummary";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../../../colors";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "../../../UI/Spinner/Spinner";
import InformationText from "../../../UI/InformationText/InformationText";
import MeetingForm from "../../Form";
import useFirebase from "../../../../hooks/useFirebase";
import { BottomSheetSelectedEv } from "../../../../types";
import dayjs from "dayjs";

const BottomSheetSelectedEvent: React.FC<BottomSheetSelectedEv> = ({
  selectedEvent,
  setSelectedEvent,
  editedEventDraft,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // const formattedPhoneNumber = phoneNumberFormatter(customer.phoneNumber);

  const [index, setIndex] = useState(0);
  const [bottomSheetShown, setBottomSheetShow] = useState(true);
  const { error, isLoading, makeFirebaseCall } = useFirebase(
    selectedEvent,
    "delete",
    null
  );
  const [editingFinished, setEditingFinished] = useState(false);
  const onCloseBottomSheet = () => {
    setSelectedEvent(undefined);
    setBottomSheetShow(false);
  };
  const confirmButtonPressHandler = () => {
    console.log("ab");
  };

  // const closestPastMeeting = useMemo(
  //   () => getClosestPastCustomerMeeting(customer),
  //   [customer]
  // );
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["20%", "95%"], []);
  const onClosePressHandler = (index: number) => {
    setIndex(index);
  };

  const deleteEventHandler = async () => {
    await makeFirebaseCall("delete");

    bottomSheetRef.current.close();
  };
  // useEffect(() => {
  //   if (!!editedEventDraft) {
  //     for (const [key, value] of Object.entries(selectedEvent)) {
  //       console.log(selectedEvent[key] === editedEventDraft[key]);
  //       console.log(selectedEvent[key], key);
  //     }
  //   }
  // }, [selectedEvent, editedEventDraft]);
  useEffect(() => {
    editingFinished === true
      ? (bottomSheetRef.current.close(), setSelectedEvent(undefined))
      : null;
  }, [editingFinished]);
  const editEventHandler = () => {
    setIsEditing(true);
    setIndex(1);
  };

  return bottomSheetShown ? (
    <BottomSheet
      enablePanDownToClose
      onClose={onCloseBottomSheet}
      onChange={onClosePressHandler}
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: colors.primary }}
      backgroundStyle={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "lightgray",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-end",
            width: 80,
            marginHorizontal: 12,
          }}
        >
          <AntDesign
            name="edit"
            onPress={editEventHandler}
            size={24}
            color={colors.greydark}
          />
          <AntDesign
            onPress={deleteEventHandler}
            name="delete"
            size={24}
            color={colors.greydark}
          />
        </View>
        {isLoading ? (
          <Spinner borderWidth={5} size={50} />
        ) : error ? (
          <InformationText stylingProps={{ color: "red" }}>
            Wystąpił błąd spróbuj ponownie.
          </InformationText>
        ) : !isEditing ? (
          <NewMeetingFormSummary
            customerName={selectedEvent.title}
            worker={selectedEvent.worker}
            service={selectedEvent?.serviceName}
            submitHandler={null}
            date={dayjs(selectedEvent?.start).toDate()}
            endHour={selectedEvent?.endHour}
            style={{ borderWidth: 0, margin: 0, width: "100%" }}
          />
        ) : (
          <MeetingForm
            timelineDate={selectedEvent.day}
            worker={selectedEvent.worker}
            service={selectedEvent.serviceName}
            customerName={selectedEvent.title}
            selectedEvent={selectedEvent}
            editedEventDraft={editedEventDraft}
            editing
            setEditingFinished={setEditingFinished}
            setIndexForm={setIndex}
          />
        )}
      </View>
    </BottomSheet>
  ) : null;
};
export default BottomSheetSelectedEvent;
