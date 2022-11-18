import { addHours, addMinutes, subHours } from "date-fns";

function getEventExcludedTimes(duration: number, date: Date) {
  const eventDuration = [];

  for (let i = 0; i < duration; i += 15) {
    eventDuration.push(
      subHours(new Date(addMinutes(date, i)), 1)
        .toLocaleTimeString()
        .slice(0, 5)
    );
  }

  return eventDuration;
}

export default getEventExcludedTimes;
