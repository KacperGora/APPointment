import { useContext, useEffect, useState } from "react";
import { hours } from "../../data";
import { MeetingsContext } from "../../store/CalendarStore";
import { Meeting } from "../../types";

const useGetAvailableHours = (pickedDay: string, worker: string) => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx?.meetings;
  const [avHours, setAvHours] = useState([]);
  const allHours = hours;
  const meetingsAtThisDay: Meeting[] = meetings[pickedDay]?.filter(
    (meeting) => meeting.worker === worker
  );
  const excludedTimesAtThisDay: string[] = [];
  useEffect(() => {
    meetingsAtThisDay?.forEach((element) =>
      excludedTimesAtThisDay.push(...element.excludedTimes)
    );
    const res = allHours.filter(
      (hour) => !excludedTimesAtThisDay.includes(hour.value)
    );

    setAvHours(res);
  }, [pickedDay, worker]);

  return avHours;
};
export default useGetAvailableHours;
