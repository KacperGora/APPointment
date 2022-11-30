import { addMinutes, subHours } from "date-fns";

function calculateTimeOfEnd(startTime: string, duration: number) {
  const startTimeDate = new Date(startTime);
  let timeString;
  if (duration === undefined) {
    timeString = new Date(addMinutes(startTimeDate, 90)).toLocaleTimeString();
  } else {
    timeString = subHours(
      new Date(addMinutes(startTimeDate, duration)),
      1
    ).toLocaleTimeString();
  }

  return timeString;
}

export default calculateTimeOfEnd;
