import { addMinutes, areIntervalsOverlapping } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { MeetingsContext } from "../../../../store/CalendarStore";

function useCheckOverlappingEvents(
  pickedDate: string,
  serviceDuration: number,
  newMeetingDate: Date,
  worker: string
) {
  const [isOverlapped, setOverlapped] = useState(false);
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  const meetingsAtPickedDate = meetings[pickedDate];
  const employeeMeetingsArray = meetingsAtPickedDate?.filter(
    (meeting) => meeting.worker === worker
  );
  useEffect(() => {
    setOverlapped(false);
    if (Number.isInteger(employeeMeetingsArray?.length)) {
      employeeMeetingsArray.forEach((meeting) => {
        if (
          areIntervalsOverlapping(
            {
              start: new Date(meeting?.start),
              end: new Date(meeting?.end),
            },
            {
              start: newMeetingDate,
              end: addMinutes(newMeetingDate, serviceDuration),
            }
          )
        ) {
          setOverlapped(true);
        }
      });
    }
  }, [employeeMeetingsArray, serviceDuration]);

  return isOverlapped;
}

export default useCheckOverlappingEvents;
