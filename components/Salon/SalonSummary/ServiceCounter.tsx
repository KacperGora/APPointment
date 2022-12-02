import { isThisMonth, isThisWeek } from "date-fns";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { CalendarContext } from "react-native-calendars";
import { MeetingsContext } from "../../../store/CalendarStore";

const ServiceCounter = () => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  console.log(meetings);
  const meetingsServiceThisMonth = [];
  const meetingsServiceThisWeek = [];
  for (const [key, value] of Object.entries(meetings)) {
    if (isThisMonth(new Date(key))) {
      value.forEach((val) => {
        if (meetingsServiceThisMonth[val.serviceName]) {
          meetingsServiceThisMonth[val.serviceName]++;
        } else {
          meetingsServiceThisMonth[val.serviceName] = 1;
        }
      });
    }
    if (isThisWeek(new Date(key))) {
    //   console.log(key);
      value.forEach((val) => {
        if (meetingsServiceThisWeek[val.serviceName]) {
          meetingsServiceThisWeek[val.serviceName]++;
        } else {
          meetingsServiceThisWeek[val.serviceName] = 1;
        }
      });
    }
  }
  console.log(meetingsServiceThisMonth);
  console.log(meetingsServiceThisWeek);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ServiceCounter;
