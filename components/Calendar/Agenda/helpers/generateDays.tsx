import { DateData } from "react-native-calendars";
import { timeToString } from "../../../../Utils/formatUtilis";

const generateDays = (day: DateData, data) => {
  const items = {};
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
      }
    }
  });
  for (let [key, value] of Object.entries(data)) {
    items[key] = value;
  }
  return items;
};

export default generateDays;
