import { addMinutes, subHours } from "date-fns";

function getEventExcludedTimes(duration: number, date: Date) {
  const eventDuration = [];

  for (let i = 0; i < duration; i += 15) {
    eventDuration.push(
      new Date(addMinutes(date, i)).toLocaleTimeString().slice(0, 5)
    );
  }

  return eventDuration;
}

export default getEventExcludedTimes;
