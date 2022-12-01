import { addMinutes, subHours } from "date-fns";

function calculateTimeOfEnd(startTime: string, duration: number) {
  const startTimeDate = new Date(startTime);

  if (duration === undefined) {
    return new Date(addMinutes(startTimeDate, 90)).toLocaleTimeString();
  } else {
    return subHours(
      new Date(addMinutes(startTimeDate, duration)),
      1
    ).toLocaleTimeString();
  }
}

export default calculateTimeOfEnd;
