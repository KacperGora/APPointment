import { addHours, addMinutes } from "date-fns";

function calculateTimeOfEnd(startTime: Date, duration: number) {
  return addMinutes(startTime, duration);
}

export default calculateTimeOfEnd;
