import { subHours } from "date-fns";
import calculateTimeOfEnd from "./calculateTimeOfEnd";

const dateFormatter = (pickedDate, pickedHour, pickedService) => {
  const startFullDate =
    pickedDate + "T" + (pickedHour?.value || "09:00") + ":00.000Z";
  const startISO = new Date(subHours(new Date(startFullDate), 1)).toISOString();
  const endHour = calculateTimeOfEnd(startFullDate, pickedService?.duration);
  const endFullDate = pickedDate + "T" + endHour + ".000Z";
  const endISODate = new Date(subHours(new Date(endFullDate), 1)).toISOString();
  return { startFullDate, startISO, endHour, endISODate };
};
export default dateFormatter;
