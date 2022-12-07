import { addDays } from "date-fns";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { MeetingsContext } from "../../../store/CalendarStore";

const TimelineHeader = ({ color }) => {
  const ctx = useContext(MeetingsContext);
  console.log(ctx.timelinePeriod);
  //   console.log(
  //     new Date(addDays(new Date(ctx.timelinePeriod), 6)).toLocaleString(
  //       "default",
  //       { month: "long", minute: "numeric" }
  //     )
  //   );
  return (
    <View>
      <Text style={{ color: color, fontWeight: "600", fontSize: 16 }}>
        {ctx.timelinePeriod}
      </Text>
    </View>
  );
};

export default TimelineHeader;
