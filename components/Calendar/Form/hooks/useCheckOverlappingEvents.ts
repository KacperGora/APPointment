import { addMinutes, areIntervalsOverlapping } from "date-fns";
import dayjs from "dayjs";
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
  const data = ctx.meetings;
  const meetingsAtPickedDate = data[pickedDate];
  const employeeMeetingsArray = meetingsAtPickedDate?.filter(
    (meeting) => meeting.worker === worker
  );

  useEffect(() => {
    setOverlapped(false);
    if (Number.isInteger(employeeMeetingsArray?.length)) {
      employeeMeetingsArray?.forEach((meeting) => {
        if (
          areIntervalsOverlapping(
            {
              start: dayjs(meeting?.start).toDate(),
              end: dayjs(meeting?.start).toDate(),
            },
            {
              start: newMeetingDate,
              end: addMinutes(newMeetingDate, serviceDuration || 90),
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
