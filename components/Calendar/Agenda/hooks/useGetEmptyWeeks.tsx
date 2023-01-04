import { isMonday, nextMonday } from "date-fns";
import { isEmpty } from "lodash";

const useGetEmptyWeeks = (agendaItems) => {
  const emptyDates = [];
  const emptyMondays = [];
  for (const [key, value] of Object.entries(agendaItems)) {
    if (isEmpty(value)) {
      emptyDates.push(key);
    }
  }
  for (let i = 0; i < emptyDates.length; i++) {
    if (isMonday(new Date(emptyDates[i]))) {
      emptyMondays.push(emptyDates[i]);
    }
  }
  const emptyWeeks = emptyMondays.map((monday, index) => {
    if (
      nextMonday(new Date(monday)).toDateString() ===
      new Date(emptyMondays[index + 1]).toDateString()
    ) {
      return { start: monday, end: emptyMondays[index + 1] };
    } else return monday;
  });

  return emptyWeeks;
};
export default useGetEmptyWeeks;
