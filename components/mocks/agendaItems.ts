import isEmpty from "lodash/isEmpty";
import { MarkedDates } from "./types";

const today = new Date().toISOString().split("T")[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split("T")[0];
}

export const agendaItems = [
  {
    title: dates[0],
    data: [
      {
        hour: "12:30",
        end: "13:30",
        duration: "1h",
        title: "J. Mlyczyńska",
        serviceName: "Manicure Klasyczny",
      },
    ],
  },
  {
    title: dates[1],
    data: [
      {
        hour: "12:30",
        end: "15:30",
        duration: "1h",
        title: "K. Góra",
        serviceName: "Manicure Hybrydowy",
      },
      {
        hour: "12:30",
        end: "15:30",
        duration: "1h",
        title: "K. Góra",
        serviceName: "Manicure Hybrydowy",
      },
    ],
  },
  {
    title: dates[2],
    data: [
      {
        hour: "12:30",
        end: "15:30",
        duration: "1h",
        title: "K. Góra",
        serviceName: "Manicure Hybrydowy",
      },
      {
        hour: "12:30",
        end: "15:30",
        duration: "1h",
        title: "K. Góra",
        serviceName: "Manicure Hybrydowy",
      },
    ],
  },
];

export function getMarkedDates() {
  const marked: MarkedDates = {};

  agendaItems.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    }
  });
  return marked;
}
