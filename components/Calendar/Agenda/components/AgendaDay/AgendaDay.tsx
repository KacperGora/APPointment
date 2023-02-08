import React from "react";
import { View } from "react-native";
import { AgendaDayProps } from "../../../../../types";
import SmallText from "../../../../UI/Text/SmallText";
import AgendaItem from "../AgendaItem/AgendaItem";
import { ViewRow } from "../../style/Agenda.style";
import { getAgendaDayConfig } from "../../config/agendaDayConfig";
import EmptyWeek from "./EmptyWeek";
import { not } from "react-native-reanimated";
import { ScreenWidth } from "../../../../shared";

const AgendaDay: React.FC<AgendaDayProps> = (props) => {
  const { item, emptyWeeks } = props;
  const agendaDayConfig = getAgendaDayConfig(props);

  return item === undefined ? null : (
    <ViewRow>
      <View style={{ width: ScreenWidth / 8 }}>
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
};

export default AgendaDay;
