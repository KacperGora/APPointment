import { useMemo } from "react";
import { TextStyle } from "react-native";
import useFetchEvents from "../../../../hooks/calendar/useFetchEvents";
import { colors } from "../../../colors";
import getDailyIncome from "../helpers/getDailyIncome";

export function getAgendaDayConfig(props) {
  const { item, nameDay, day, nameMonth, fullDate } = props;
  const { flatData } = useFetchEvents();
  const dailyIncome = useMemo(() => getDailyIncome(flatData), [flatData]);
  const textStyle: TextStyle = {
    fontSize: 12,
    color: item !== undefined ? colors.greydark : "#b3b7bd",
    alignSelf: "flex-end",
  };
  const textStyle2: TextStyle = {
    color: colors.secondary,
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 8,
  };
  const agendaDayConfig = [
    { id: 1, text: nameDay, props: textStyle },
    {
      id: 2,
      text: day && nameMonth !== undefined ? `${day} ${nameMonth}` : null,
      props: textStyle,
    },
    {
      id: 3,
      text:
        dailyIncome[fullDate] !== undefined
          ? `${dailyIncome[fullDate]} PLN`
          : null,
      props: textStyle2,
    },
  ];
  return agendaDayConfig;
}