import { addHours, addMinutes, subHours } from "date-fns";

function calculateTimeOfEnd(startTime: Date, duration: number) {
  return subHours(addMinutes(startTime, duration), 1);
}

export default calculateTimeOfEnd;
