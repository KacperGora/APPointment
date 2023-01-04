import "moment";
import "moment/locale/pl";
import React, { FunctionComponent, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import { ISOSplitter } from "../../../../../Utils/formatUtilis";
import { colors } from "../../../../colors";

const locale = {
  name: "pl",
  config: {},
};
interface Props {
  date: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
}
const NewMeetingFormSummary: FunctionComponent<Props> = ({
  date,
  setNewDate,
}) => {
  const [pickedDate, setPickedDate] = useState(date);
  const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
    return date.isoWeekday() === 7;
  };

  const dateSelectionHandler = (date: moment.Moment) => {
    setPickedDate(ISOSplitter(date.toISOString(), 0));
    setNewDate(ISOSplitter(date.toISOString(), 0));
  };
  return (
    <CalendarStrip
      locale={locale}
      style={{
        height: 100,
        borderBottomColor: "lightgray",
        borderBottomWidth: 0.3,
      }}
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={{
        type: "border",
        duration: 200,
        borderWidth: 1,
        borderHighlightColor: colors.primary,
      }}
      scrollable
      calendarHeaderStyle={{
        color: "gray",
        textTransform: "capitalize",
      }}
      dateNumberStyle={{ color: "black" }}
      dateNameStyle={{ color: "gray", fontSize: 10 }}
      highlightDateNameStyle={{ color: "white", fontSize: 10 }}
      highlightDateNumberStyle={{ color: "white", fontSize: 12 }}
      highlightDateContainerStyle={{
        backgroundColor: colors.primary,
        borderRadius: 12,
        opacity: 0.8,
      }}
      disabledDateNameStyle={{ color: "grey" }}
      disabledDateNumberStyle={{ color: "grey" }}
      iconContainer={{ flex: 0.1 }}
      datesBlacklist={datesBlacklistFunc}
      onDateSelected={dateSelectionHandler}
      selectedDate={new Date(pickedDate)}
    />
  );
};

export default NewMeetingFormSummary;
