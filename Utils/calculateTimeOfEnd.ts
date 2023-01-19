import dayjs from "dayjs";

function calculateTimeOfEnd(startTime: string | Date, duration: number) {
  return dayjs(startTime)
    .add(duration || 90, "minutes")
    .format("HH:mm");
}

export default calculateTimeOfEnd;
