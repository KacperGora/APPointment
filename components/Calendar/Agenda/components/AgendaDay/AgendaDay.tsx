import React from "react";
import { View } from "react-native";
import { AgendaDayProps } from "../../../../../types";
import SmallText from "../../../../UI/Text/SmallText";
import AgendaItem from "../AgendaItem/AgendaItem";
import { ViewRow } from "../../style/Agenda.style";
import { getAgendaDayConfig } from "../../config/agendaDayConfig";
import EmptyWeek from "./EmptyWeek";

const AgendaDay: React.FC<AgendaDayProps> = (props) => {
  const { item, emptyWeeks, fullDate } = props;
  const agendaDayConfig = getAgendaDayConfig(props);
  const emptyDates = emptyWeeks.filter(
    (week) => (week.start || week) === fullDate
  );
  if (item !== undefined) {
    return (
      <ViewRow>
        <View style={{ width: 50 }}>
          {agendaDayConfig.map((value) => {
            return (
              <SmallText key={value.id} textStyles={value.props}>
                {value.text}
              </SmallText>
            );
          })}
        </View>
        <AgendaItem
          fullDate={props.fullDate}
          item={item}
          emptyWeeks={emptyWeeks}
        />
      </ViewRow>
    );
  } else {
    return emptyDates.map((date) => <EmptyWeek date={date} />);
  }
};
export default AgendaDay;
