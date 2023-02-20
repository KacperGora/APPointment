import { isSameMonth } from "date-fns";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useFetchData from "../../../../hooks/calendar/useFetchData";
type Month = {
  short: string;
  long: string;
  index: number;
  folder: string;
};
type SpendingType = {
  name: string;
  value: number;
  type: "spending" | "income";
  date: string;
  folder: string;
};
const useGetMonthlyFunds = (
  selectedMonth: Month,
  selectedType: "all" | "spending" | "income"
) => {
  const { salonSpending, eventsData } = useFetchData();
  const [earningData, setEarningData] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const selectedMonthSpending = salonSpending[selectedMonth.folder] || [];
  const thisMonthEvents = [];
  useEffect(() => {
    setEarningData([]);
    for (const [key, value] of Object.entries(eventsData)) {
      if (
        isSameMonth(
          dayjs(key).toDate(),
          dayjs().set("month", selectedMonth.index).toDate()
        )
      ) {
        const newVal: SpendingType[] = value.flat().map((el) => {
          return {
            name: el.title,
            value: el.servicePrice,
            date: dayjs(el.day).format("DD.MM.YY"),
            folder: dayjs(el.day).format("MM-YYYY"),
            type: "income",
            id: el.id,
          };
        });
        thisMonthEvents.push(...newVal);
      }
      setEarningData(thisMonthEvents);
    }
  }, [selectedMonth, eventsData]);

  const generateData = () => {
    if (selectedType === "all") {
      return earningData.concat(selectedMonthSpending);
    } else if (selectedType === "spending") {
      return selectedMonthSpending;
    } else if (selectedType === "income") {
      return earningData;
    }
  };
  const totalData = generateData().filter((el) =>
    el.name.toLowerCase().includes(searchedValue.toLowerCase())
  );
  const searchPressHandler = (value) => {
    setSearchedValue(value);
  };
  const spending = selectedMonthSpending
    .map((el) => el.value)
    .reduce((acc, val) => (acc += val), 0);

  const income = earningData
    .map((el) => el.value)
    .reduce((acc, val) => (acc += val), 0);

  return { spending, income, totalData, searchPressHandler };
};
export default useGetMonthlyFunds;
