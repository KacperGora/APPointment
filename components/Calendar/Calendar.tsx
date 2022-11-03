import "moment";
import "moment/locale/pl";

import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { colors } from "../colors";
import * as ExpoCalendar from "expo-calendar";

const locale = {
  name: "pl",
  config: {},
};
interface Props {
  date: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
}
const Calendar: FunctionComponent<Props> = ({ date, setNewDate }) => {
  const [pickedDate, setPickedDate] = useState(new Date(date).toDateString());

  const selectDateHandler = (e: any) => {
    console.log(e);
  };
  const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
    return date.isoWeekday() === 7;
  };

  const dateSelectionHandler = (date: moment.Moment | Date) => {
    setPickedDate(date.toString());
    setNewDate(date.toString())
  };

  return (
    <CalendarStrip
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={{
        type: "border",

        duration: 200,
        borderWidth: 1,
        borderHighlightColor: colors.primary,
      }}
      scrollable
      style={{ height: 100, paddingBottom: 10 }}
      calendarHeaderStyle={{ color: "black" }}
      dateNumberStyle={{ color: "black" }}
      dateNameStyle={{ color: "black" }}
      highlightDateNumberStyle={{ color: "black" }}
      highlightDateNameStyle={{ color: "black" }}
      disabledDateNameStyle={{ color: "grey" }}
      disabledDateNumberStyle={{ color: "grey" }}
      datesBlacklist={datesBlacklistFunc}
      // datesWhitelist={datesWhitelist}
      // datesBlacklist={datesBlacklist}
      // iconLeft={require("./img/left-arrow.png")}
      // iconRight={require("./img/right-arrow.png")}
      iconContainer={{ flex: 0.1 }}
      onDateSelected={dateSelectionHandler}
      selectedDate={new Date(pickedDate)}
    />
  );
};

export default Calendar;

const styles = StyleSheet.create({});
