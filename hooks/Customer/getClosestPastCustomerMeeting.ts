import { closestTo, isAfter, isBefore, parseISO } from "date-fns";
import dayjs from "dayjs";
import { NewUserData } from "../../types";
import { AntDesign } from "@expo/vector-icons";
const getClosestCustomersMeeting = (customerData: NewUserData) => {
  const pastMeetings = customerData.meetings.filter((item) =>
    isBefore(parseISO(item.start), new Date())
  );
  const futureMeetings = customerData.meetings.filter((item) =>
    isAfter(parseISO(item.start), new Date())
  );

  const pastMeetingsDates = pastMeetings
    .filter((item) => isBefore(parseISO(item.start), new Date()))
    .map((el) => new Date(el.start));

  const futureMeetingsDates = futureMeetings
    .filter((item) => isAfter(parseISO(item.start), new Date()))
    .map((el) => new Date(el.start));

  const closestPastMeetingDate = closestTo(
    new Date(),
    pastMeetingsDates
  )?.toISOString();

  const closestFutureMeetingDate = closestTo(
    new Date(),
    futureMeetingsDates
  )?.toISOString();

  const closestPastMeeting = pastMeetings?.find(
    (meeting) => meeting.start === closestPastMeetingDate
  );
  const closestFutureMeeting = futureMeetings?.find(
    (meeting) => meeting.start === closestFutureMeetingDate
  );
  return { closestPastMeeting, closestFutureMeeting };
};

export default getClosestCustomersMeeting;
