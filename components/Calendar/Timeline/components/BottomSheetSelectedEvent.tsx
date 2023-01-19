import React, { useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import RegularText16 from "../../../UI/Text/RegularText";
import RegularText24 from "../../../UI/Text/RegularText24";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";
import dayjs from "dayjs";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent";
import {
  BottomSheetEditContainer,
  RowFlex,
  RowFlexEndView,
} from "../style/Timeline.style";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetCurrentCustomer from "../../../../hooks/useGetCurrentCustomer";
import { phoneNumberFormatter } from "../../../../Utils/formatUtilis";
import PhoneLink from "../../../UI/Text/PhoneLink";
import SmallText from "../../../UI/Text/SmallText";
import getClosestPastCustomerMeeting from "../../../../hooks/Customer/getClosestPastCustomerMeeting";
import NewMeetingFormSummary from "../../Form/components/FormSummary/NewMeetingFormSummary";
const BottomSheetSelectedEvent = ({ selectedEvent, setSelectedEvent }) => {
  const customer = useGetCurrentCustomer(selectedEvent.worker);
  const formattedPhoneNumber = phoneNumberFormatter(customer.phoneNumber);

  const [index, setIndex] = useState(1);
  const onCloseBottomSheet = () => {
    setSelectedEvent(undefined);
  };
  const confirmButtonPressHandler = () => {
    console.log("ab");
  };
  const closestPastMeeting = useMemo(
    () => getClosestPastCustomerMeeting(customer),
    [customer]
  );

  const formattedDate =
    typeof closestPastMeeting === "string"
      ? null
      : dayjs(closestPastMeeting.start).format("DD MMM YYYY HH:mm");
  const [showModalDropdown, setShowModalDropdown] = useState(false);

  return (
    <BottomSheetComponent
      index={index}
      setIndex={setIndex}
      onCloseBottomSheet={onCloseBottomSheet}
    >
      {/* <NewMeetingFormSummary /> */}
    </BottomSheetComponent>
  );
};
export default BottomSheetSelectedEvent;
