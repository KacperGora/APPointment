import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { ExpandableCalendar } from "react-native-calendars";
import ExpandableCalendarScreen from "../components/Calendar/CalendarScreen/ExpandableCalendarScreen";
import useFetchEvents from "../hooks/calendar/useFetchEvents";
import { MeetingsContext } from "../store/CalendarStore";

const Home = () => {
  return (
    <View>
      <ExpandableCalendarScreen />
    </View>
  );
};

export default Home;
