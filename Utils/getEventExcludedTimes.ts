import dayjs from "dayjs";

function getEventExcludedTimes(duration: number, date: Date) {
  const eventDuration = [];

  for (let i = 0; i < duration; i += 15) {
    eventDuration.push(dayjs(date).add(i, "minutes").format("HH:mm"));
  }
  return eventDuration;
}

export default getEventExcludedTimes;
