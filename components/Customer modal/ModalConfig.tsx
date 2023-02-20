import dayjs from "dayjs";
import getClosestPastCustomerMeeting from "../../hooks/Customer/getClosestPastCustomerMeeting";
import { colors } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React from "react";
export const getModalConfig = (item) => {
  const { closestFutureMeeting, closestPastMeeting } =
    getClosestPastCustomerMeeting(item);
  const formattedDatePast =
    !!closestPastMeeting &&
    dayjs(closestPastMeeting?.start).format("DD MMMM HH:mm");
  const formattedDateFuture =
    !!closestFutureMeeting &&
    dayjs(closestFutureMeeting?.start).format("DD MMMM HH:mm");
  const futureEventDestination = dayjs(closestFutureMeeting?.start).format(
    "YYYY-MM-DD"
  );
  const pastEventDestination = dayjs(closestPastMeeting?.start).format(
    "YYYY-MM-DD"
  );
  const data = [
    {
      id: 1,
      navigate: pastEventDestination,
      title: "Ostatnia wizyta",
      closestMeeting: closestPastMeeting,
      value: closestPastMeeting?.serviceName,
      date: formattedDatePast ? formattedDatePast : "Brak ostatniej wizyty",
      icon: (
        <Entypo
          name="back-in-time"
          size={24}
          color={colors.greydark}
          style={{ marginRight: 12 }}
        />
      ),
    },
    {
      id: 2,
      navigate: futureEventDestination,
      title: "Zaplanowana wizyta",
      closestMeeting: closestFutureMeeting,
      value: closestFutureMeeting?.serviceName,
      date: formattedDateFuture
        ? formattedDateFuture
        : "Brak zaplanowanej wizyty",
      icon: (
        <Ionicons
          name="calendar-outline"
          size={24}
          color={colors.greydark}
          style={{ marginRight: 12 }}
        />
      ),
    },
    {
      id: 3,
      navigate: null,
      title: "Informacje",
      value: item.additionalInfo,
      date: "",
      icon: (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={colors.greydark}
          style={{ marginRight: 12 }}
        />
      ),
    },
  ];
  return data;
};
