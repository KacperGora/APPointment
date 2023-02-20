import { isThisMonth, isThisWeek } from "date-fns";
import { useContext } from "react";
import { MeetingsContext } from "../../../../store/CalendarStore";

const useServiceCounter = () => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  const meetingsServiceThisMonth = {};
  const meetingsServiceThisWeek = {};
  for (const [key, value] of Object.entries(meetings)) {
    if (isThisMonth(new Date(key))) {
      value.forEach((val) => {
        if (meetingsServiceThisMonth[val.serviceName]) {
          meetingsServiceThisMonth[val.serviceName]++;
        } else {
          meetingsServiceThisMonth[val.serviceName] = 1;
        }
      });
    }
    if (isThisWeek(new Date(key))) {
      value.forEach((val) => {
        if (meetingsServiceThisWeek[val.serviceName]) {
          meetingsServiceThisWeek[val.serviceName]++;
        } else {
          meetingsServiceThisWeek[val.serviceName] = 1;
        }
      });
    }
  }
  return { meetingsServiceThisMonth, meetingsServiceThisWeek };
};

export default useServiceCounter;
