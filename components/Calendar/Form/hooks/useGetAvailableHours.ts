import { useContext, useEffect } from "react";
import { hours } from "../../../../data";
import { MeetingsContext } from "../../../../store/CalendarStore";
import dayjs from "dayjs";
import { differenceInMinutes } from "date-fns";
import { SelectiveOptions } from "../../../../types";
const useGetAvailableHours = (
  pickedDay: string,
  worker: string,
  pickedService: SelectiveOptions
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

  const avHours = [];

  const loopNumber =
    rawAvailableHours?.length - numberOfServiceDurationIntervals;

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

  return avHours.map((el) => {
    return { value: el, isActive: false };
  });
};
export default useGetAvailableHours;
