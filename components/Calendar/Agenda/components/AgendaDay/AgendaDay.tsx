import React from "react";
import { FlexAlignType, View } from "react-native";
import { AgendaDayProps } from "../../../../../types";
import { colors } from "../../../../colors";
import SmallText from "../../../../UI/Text/SmallText";
import AgendaItem from "../AgendaItem/AgendaItem";
import useGetDailyIncome from "../../hooks/useGetDailyIncome";

const AgendaDay: React.FC<AgendaDayProps> = ({
  nameDay,
  day,
  nameMonth,
  item,
  fullDate,
}) => {
  const dailyIncome = useGetDailyIncome(fullDate);
  const textStyle: {
    fontSize: number;
    color: string;
    alignSelf: FlexAlignType;
  } = {
    fontSize: 12,
    color: colors.greydark,
    alignSelf: "flex-end",
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={{ width: 50 }}>
        <SmallText textStyles={textStyle}>{nameDay}</SmallText>

        <SmallText textStyles={textStyle}>
          {day} {nameMonth}
        </SmallText>
        {day !== undefined ? (
          <SmallText
            textStyles={{
              color: colors.secondary,
              fontSize: 10,
              alignSelf: "flex-end",
              marginTop: 8,
            }}
          >
            {dailyIncome[fullDate?.toISOString().split("T")[0]]} PLN
          </SmallText>
        ) : null}
      </View>
      <AgendaItem item={item} />
    </View>
  );
};
export default AgendaDay;
