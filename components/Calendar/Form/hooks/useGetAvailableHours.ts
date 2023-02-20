import { useContext, useEffect } from "react";
import { hours } from "../../../../data";
import { MeetingsContext } from "../../../../store/CalendarStore";
import dayjs from "dayjs";
import { differenceInMinutes } from "date-fns";
import { Hours, Meeting, SelectiveOptions } from "../../../../types";
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

  const excludedTimesForEmployee = (event: Meeting) => event.worker === worker;
  const getOnlyExcludedTimes = (event: Meeting) => event.excludedTimes;
  const editingEventExcludedTimes = (hour: string) =>
    !selectedEvent?.excludedTimes.includes(hour);
  const getOnlyTimeValues = (el: Hours) => el.value;

  const excludedTimesAtThisDayForEmployee = meetings[pickedDay]
    ?.filter(excludedTimesForEmployee)
    .map(getOnlyExcludedTimes)
    .flat()
    .filter(editingEventExcludedTimes);

  const filterFromAllHoursEmployeeExcludedTimes = (hour: Hours) =>
    !excludedTimesAtThisDayForEmployee?.includes(hour.value);

  const rawAvailableHours = openHours
    ?.filter(filterFromAllHoursEmployeeExcludedTimes)
    .map(getOnlyTimeValues);

  const loopNumber =
    rawAvailableHours?.length - numberOfServiceDurationIntervals;
  const startEndWindow = pickedService?.duration - 15;
  const avHours = [];

  for (let i = 0; i < loopNumber; i++) {
    const endTime = dayjs(
      `${pickedDay} ${
        rawAvailableHours[numberOfServiceDurationIntervals + i - 1]
      }`
    ).toDate();

    const startTime = dayjs(`${pickedDay} ${rawAvailableHours[i]}`).toDate();

    if (differenceInMinutes(endTime, startTime) === startEndWindow) {
      avHours.push(rawAvailableHours[i]);
    }
  }

  return avHours.map((el) => {
    return { value: el, isActive: false };
  });
};
export default useGetAvailableHours;
