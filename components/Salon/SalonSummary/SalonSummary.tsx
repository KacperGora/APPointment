import { Dimensions, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { MeetingsContext } from "../../../store/CalendarStore";

import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../colors";
import TargetSlider from "../../Settings/Targets/TargetSlider";
import { daysToWeeks } from "date-fns";
import { SaloonContext } from "../../../store/SaloonStore";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;
function SalonSummary() {
  const meetingCtx = useContext(MeetingsContext);
  const targetCtx = useContext(SaloonContext);
  const events = meetingCtx.meetings;

  const todayString = new Date().toISOString().split("T")[0];

  const sevenDaysBefore = moment().subtract(7, "days");

  console.log(sevenDaysBefore);
  const initialDailyValue = 0;
  const todayMeetingPrices = [];
  events[todayString]?.forEach((event) =>
    todayMeetingPrices.push(event.servicePrice)
  );
  const todayEarnings = todayMeetingPrices.reduce(
    (accumulator, currVal) => accumulator + currVal,
    initialDailyValue
  );
  const todayPrecentage: number = +(
    todayEarnings / targetCtx.dailyTarget
  ).toFixed(2);

  const data = {
    labels: ["Dziś", "Tydzień", "Miesiąc"], // optional
    colors: ["#6e5318", "#268102", "#e32e2"],
    data: [todayPrecentage, 0.6, 0.8],
  };
  const chartConfig = {
    backgroundGradientFrom: "#efeeee",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#e3e3e3",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(96, 151, 261, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };


  return (
    <SafeAreaView>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={50}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </SafeAreaView>
  );
}

export default SalonSummary;
