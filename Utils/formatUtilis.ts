import dayjs from "dayjs";
import calculateTimeOfEnd from "./calculateTimeOfEnd";
import { Hours, SelectiveOptions } from "../types";
export const dateFormatter = (
  pickedDate: string,
  pickedHour: Hours,
  pickedService: SelectiveOptions,
  availableHours: Hours[]
) => {
  const startFullDateISO = dayjs(
    `${pickedDate} ${pickedHour?.value || availableHours[0]?.value || "09:00"}`
  ).toISOString();
  const startFullDate = dayjs(startFullDateISO).toDate();

  const day = dayjs(startFullDate).format("YYYY-MM-DD");
  const endHour = calculateTimeOfEnd(startFullDateISO, pickedService?.duration);
  const endFullDateISO = dayjs(`${pickedDate} ${endHour}`).toISOString();

  return {
    startFullDateISO,
    endHour,
    endFullDateISO,
    startFullDate,
    day,
  };
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

export const ISOSplitter = (date: string, index: number) => {
  return date?.split("T")[index];
};
