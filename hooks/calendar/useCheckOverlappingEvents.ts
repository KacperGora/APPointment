import { addMinutes, areIntervalsOverlapping, subHours } from "date-fns";
import { useEffect, useState } from "react";
import { AllMeetings, Meeting } from "../../types";
import useSortData from "./useSortData";

function useCheckOverlappingEvents(
  pickedDate: any,

  serviceDuration: number,
  newMeetingDate: Date,
  worker: string
) {
  const meetings = useSortData();

  const [isOverlapped, setOverlapped] = useState(false);
  const meetingsAtPickedDate = meetings?.filter(
    (meeting: AllMeetings) => meeting.key === pickedDate
  );

  const newArr: Meeting[] = [];
  for (const [key, value] of Object.entries(meetingsAtPickedDate)) {
    newArr.push(...value.data);
  }

  const filteredArray = newArr.filter((meeting) => meeting.worker === worker);

  useEffect(() => {
    setOverlapped(false);
    if (filteredArray.valueOf() !== NaN && serviceDuration) {
      filteredArray?.forEach((meeting) => {
        if (
          areIntervalsOverlapping(
            {
              start: subHours(new Date(meeting?.start), 1),
              end: subHours(new Date(meeting?.end), 1),
            },
            {
              start: subHours(newMeetingDate, 1),
              end: addMinutes(subHours(newMeetingDate, 1), serviceDuration),
            }
          )
        ) {
          setOverlapped(true);
        }
      });
    }
  }, [meetingsAtPickedDate, pickedDate, serviceDuration]);

  return isOverlapped;
}

export default useCheckOverlappingEvents;
