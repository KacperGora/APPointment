import { closestTo, isBefore, parseISO } from "date-fns";
import { NewUserData } from "../../types";

const getClosestPastCustomerMeeting = (customerData: NewUserData) => {
  const pastMeetings = customerData.meetings.filter((item) =>
    isBefore(parseISO(item.start), new Date())
  );
  const pastMeetingsDates = pastMeetings
    .filter((item) => isBefore(parseISO(item.start), new Date()))
    .map((el) => new Date(el.start));

  const closestPastMeetingDate = closestTo(
    new Date(),
    pastMeetingsDates
  )?.toISOString();

  return pastMeetings?.find(
    (meeting) => meeting.start === closestPastMeetingDate
  );
};

export default getClosestPastCustomerMeeting;
