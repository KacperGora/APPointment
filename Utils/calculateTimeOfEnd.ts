import { addMinutes } from "date-fns";

function calculateTimeOfEnd(startTime: Date, duration: number) {
  const timeString = new Date(
    addMinutes(startTime, duration)
  ).toLocaleTimeString();

  if (timeString === "Invalid Date") {
    return "09:00:00";
  } else return timeString;
}

export default calculateTimeOfEnd;
