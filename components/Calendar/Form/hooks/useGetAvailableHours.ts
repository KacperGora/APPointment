import { useContext, useEffect } from "react";
import { hours } from "../../../../data";
import { MeetingsContext } from "../../../../store/CalendarStore";
import dayjs from "dayjs";
import { differenceInMinutes } from "date-fns";
import { Meeting, SelectiveOptions } from "../../../../types";
import { PackedEvent } from "@howljs/calendar-kit";
const useGetAvailableHours = (
  pickedDay: string,
  worker: string,
  pickedService: SelectiveOptions,
  selectedEvent: Meeting & PackedEvent
) => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx?.meetings;
  const numberOfServiceDurationIntervals = pickedService?.duration / 15;
  const openHours = [...hours];

  const excludedTimesAtThisDayForEmployee = meetings[pickedDay]
    ?.filter((event) => event.worker === worker)
    .map((el) => el.excludedTimes)
    .flat();

  const rawAvailableHours = openHours
    .filter((hour) => !excludedTimesAtThisDayForEmployee?.includes(hour.value))
    .map((el) => el.value);
  const loopNumber =
    rawAvailableHours?.length - numberOfServiceDurationIntervals;

  const avHours = [];

  for (let i = 0; i < loopNumber; i++) {
    const time1 = dayjs(
      `${pickedDay} ${
        rawAvailableHours[numberOfServiceDurationIntervals + i - 1]
      }`
    ).toDate();
    const time2 = dayjs(`${pickedDay} ${rawAvailableHours[i]}`).toDate();

    if (differenceInMinutes(time1, time2) === pickedService?.duration - 15) {
      avHours.push(rawAvailableHours[i]);
    }
  }
  const availableHoursDurningEditEvent = !!selectedEvent
    ? avHours
        .concat(selectedEvent?.excludedTimes)
        .sort((a, b) => a.localeCompare(b))
    : avHours;

  return availableHoursDurningEditEvent.map((el) => {
    return { value: el, isActive: false };
  });
};
export default useGetAvailableHours;
