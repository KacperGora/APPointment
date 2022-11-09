import { addMinutes, areIntervalsOverlapping, subHours } from "date-fns";
import { useEffect, useState } from "react";
import { AllMeetings, Meeting } from "../../types";

function useCheckOverlappingEvents(
  pickedDate: any,
  meetings: AllMeetings[],
  service: number,
  newMeetingDate: Date
) {
  const [isOverlapped, setOverlapped] = useState(false);
  const meetingsAtPickedDate = meetings.filter(
    (meeting: AllMeetings) => meeting.key === pickedDate
  );

  const newArr: Meeting[] = [];
  for (const [key, value] of Object.entries(meetingsAtPickedDate)) {
    newArr.push(...value.data);
  }
  console.log(newArr);
  useEffect(() => {
    setOverlapped(false);
    if (newMeetingDate.valueOf() !== NaN && service) {
      newArr.forEach((meeting) => {
        if (
          areIntervalsOverlapping(
            {
              start: subHours(meeting.startFullDate, 1),
              end: subHours(meeting.endFullDate, 1),
            },
            {
              start: subHours(newMeetingDate, 1),
              end: addMinutes(subHours(newMeetingDate, 1), service),
            }
          )
        ) {
          setOverlapped(true);
        }
      });
    }
  }, [meetingsAtPickedDate, pickedDate, service]);

  return isOverlapped;
}

export default useCheckOverlappingEvents;
