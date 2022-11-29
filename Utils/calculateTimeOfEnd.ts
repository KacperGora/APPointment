import { addMinutes } from "date-fns";

function calculateTimeOfEnd(startTime: string, duration: number) {
  const startTimeDate = new Date(startTime);
  let timeString;
  if (duration === undefined) {
    timeString = new Date(addMinutes(startTimeDate, 90)).toLocaleTimeString();
  } else {
    timeString = new Date(
      addMinutes(startTimeDate, duration)
    ).toLocaleTimeString();
  }

  return timeString;
}

export default calculateTimeOfEnd;
