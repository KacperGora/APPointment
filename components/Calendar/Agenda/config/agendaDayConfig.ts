import { TextStyle } from "react-native";
import useFetchData from "../../../../hooks/calendar/useFetchData";
import useFetchEvents from "../../../../hooks/calendar/useFetchData";
import { colors } from "../../../colors";
import getDailyIncome from "../helpers/getDailyIncome";

export function getAgendaDayConfig(props) {
  const { item, nameDay, day, nameMonth, fullDate } = props;
  const { eventsFlatData } = useFetchData();
  const dailyIncome = getDailyIncome(eventsFlatData);
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
  const renderCondition = day && nameMonth !== undefined;
  const agendaDayConfig = [
    {
      id: 1,
      text: renderCondition ? nameDay : null,
      props: textStyle,
    },
    {
      id: 2,
      text: renderCondition ? `${day} ${nameMonth}` : null,
      props: textStyle,
    },
    {
      id: 3,
      text:
        dailyIncome[fullDate] === undefined
          ? null
          : `${dailyIncome[fullDate]} PLN`,
      props: textStyle2,
    },
  ];

  return agendaDayConfig;
}

export function getAgendaItemDetails(item) {
  const title = item?.title;
  const serviceName = item?.serviceName;
  const singleItem: {
    value: string;
    style: TextStyle;
    id: number;
  }[] = [
    {
      id: 1,
      value: title,
      style: { color: "black", fontWeight: "bold", fontSize: 16 },
    },
    { id: 2, value: serviceName, style: { fontSize: 10, color: "#726f6f" } },
  ];
  return singleItem;
}
