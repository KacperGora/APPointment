import XDate from "xdate";
import useFetchEvents from "../../../../hooks/calendar/useFetchEvents";

const useGetDailyIncome = (fullDate: XDate) => {
  const { flatData } = useFetchEvents();
  const dailyIncome = {};
  flatData
    .filter(
      (item) =>
        item.start.split("T")[0] === fullDate?.toISOString().split("T")[0]
    )
    .map((element) => {
      if (dailyIncome[element.start.split("T")[0]]) {
        dailyIncome[element.start.split("T")[0]] =
          dailyIncome[element.start.split("T")[0]] + element.servicePrice;
      } else {
        dailyIncome[element.start.split("T")[0]] = element.servicePrice;
      }
    });
  return dailyIncome;
};
export default useGetDailyIncome;
