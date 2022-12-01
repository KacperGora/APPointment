import { closestTo, isBefore, parseISO } from "date-fns";
import { NewUserData } from "../../types";

const getClosestPastCustomerMeeting = (customerData: NewUserData) => {
  const pastMeetings = [];
  const pastMeetingsDates = [];
  customerData.meetings?.forEach((item) => {
    if (isBefore(parseISO(item.start), new Date())) {
      pastMeetingsDates.push(new Date(item.start));
      pastMeetings.push(item);
    }
  });
  if (pastMeetings.length === 0) {
    return "Nie znaleziono dla tego użytkownika przeszłych wizyt.";
  } else {
    const closestPastMeetingDate = closestTo(
      new Date(),
      pastMeetingsDates
    )?.toISOString();

    return pastMeetings?.filter(
      (meeting) => meeting.start === closestPastMeetingDate
    )[0];
  }
};

export default getClosestPastCustomerMeeting;
