import { subHours } from "date-fns";
import calculateTimeOfEnd from "./calculateTimeOfEnd";

export const dateFormatter = (pickedDate, pickedHour, pickedService) => {
  const startFullDate =
    pickedDate + "T" + (pickedHour?.value || "09:00") + ":00.000Z";
  const startISO = new Date(subHours(new Date(startFullDate), 1)).toISOString();
  const endHour = calculateTimeOfEnd(startFullDate, pickedService?.duration);
  const endFullDate = pickedDate + "T" + endHour + ".000Z";
  const endISODate = new Date(subHours(new Date(endFullDate), 1)).toISOString();

  return { startFullDate, startISO, endHour, endISODate };
};

export const phoneNumberFormatter = (phoneNumber: string) => {
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )} ${phoneNumber.slice(6, 9)}`;
};
export const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export const getMonthName = (e) => {
  return new Date(e).toLocaleString("pl-PL", {
    month: "long",
  });
};

export const todayDateData = {
  dateString: new Date().toISOString().split("T")[0],
  month: new Date().getMonth(),
  day: new Date().getDay(),
  year: new Date().getFullYear(),
  timestamp: new Date().valueOf(),
};

export const getAgendaDays = (date) => {
  const nameMonth = date?.toDate().toLocaleDateString("default", {
    month: "short",
  });
  const nameDay = date
    ?.toDate()
    .toLocaleDateString("default", {
      weekday: "short",
    })
    .split(".")[0];
  return { nameMonth, nameDay };
};
