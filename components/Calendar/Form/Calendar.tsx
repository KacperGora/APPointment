import "moment";
import "moment/locale/pl";
import React, { FunctionComponent, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import { colors } from "../../colors";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

const locale = {
  name: "pl",
  config: {},
};
interface Props {
  date: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
}
const Calendar: FunctionComponent<Props> = ({ date, setNewDate }) => {
  const [pickedDate, setPickedDate] = useState(date);

  const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
    return date.isoWeekday() === 7;
  };

  const dateSelectionHandler = (date: moment.Moment) => {
    setPickedDate(date.toISOString().split("T")[0]);
    setNewDate(date.toISOString().split("T")[0]);
  };
  return (
    <CalendarStrip
      style={{
        height: 80,
        width: "100%",
      }}
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={{
        type: "border",
        duration: 200,
        borderWidth: 1,

        borderHighlightColor: colors.primary,
      }}
      scrollable
      dateNumberStyle={{ color: "black" }}
      dateNameStyle={{ color: "gray", fontSize: 10 }}
      highlightDateNameStyle={{ color: "white", fontSize: 10 }}
      highlightDateNumberStyle={{ color: "white" }}
      highlightDateContainerStyle={{
        backgroundColor: colors.primary,
        opacity: 0.6,
      }}
      calendarHeaderStyle={{ color: colors.greydark, paddingVertical: 12 }}
      disabledDateNameStyle={{ color: "grey" }}
      disabledDateNumberStyle={{ color: "grey" }}
      datesBlacklist={datesBlacklistFunc}
      iconContainer={{ flex: 0.1 }}
      onDateSelected={dateSelectionHandler}
      selectedDate={new Date(pickedDate)}
    />
  );
};

export default Calendar;
