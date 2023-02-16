import moment from "moment";
import { useContext } from "react";
import { MeetingsContext } from "../../store/CalendarStore";
import { SaloonContext } from "../../store/SaloonStore";

const useGetPercentage = () => {
  const meetingCtx = useContext(MeetingsContext);
  const targetCtx = useContext(SaloonContext);
  const events = meetingCtx.meetings;
  const todayString = new Date().toISOString().split("T")[0];
  const todaysMeetings = events[todayString];
  const thisWeekNumber = moment().weeks();
  const thisMonthNumber = new Date().getMonth() + 1;
  //today
  const todayMeetingPrices = [];
  todaysMeetings?.forEach((meeting) =>
    todayMeetingPrices.push(meeting.servicePrice)
  );
  const todayEarnings = todayMeetingPrices.reduce(
    (accumulator, currVal) => accumulator + currVal,
    0
  );
  const todayPercentage: number = +(
    todayEarnings / targetCtx.dailyTarget
  ).toFixed(2);

  //week
  const meetingsThisWeek = [];
  for (const [key, value] of Object.entries(events)) {
    if (moment(key).weeks() === thisWeekNumber) {
      meetingsThisWeek.push(...value);
    }
  }
  const pricesThisWeek = [];
  meetingsThisWeek?.forEach((meeting) =>
    pricesThisWeek.push(meeting.servicePrice)
  );
  const weeklyEarnings = pricesThisWeek.reduce(
    (acc, currVal) => acc + currVal,
    0
  );
  const weeklyPercentage = +(weeklyEarnings / targetCtx.weeklyTarget).toFixed(
    2
  );

  //month
  const meetingsThisMonth = [];
  for (const [key, value] of Object.entries(events)) {
    if (key.includes(thisMonthNumber.toString(), 5)) {
      meetingsThisMonth.push(...value);
    }
  }
  const pricesThisMonth = [];
  meetingsThisMonth?.forEach((meeting) =>
    pricesThisMonth.push(meeting.servicePrice)
  );

  const thisMonthEarnings = pricesThisMonth.reduce(
    (acc, currVal) => acc + currVal,
    0
  );
  const monthlyPercentage: number = +(
    thisMonthEarnings / targetCtx.monthlyTarget
  ).toFixed(2);

  return {
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
    thisMonthEarnings,
    todayEarnings,
    weeklyEarnings,
  };
};
export default useGetPercentage;
