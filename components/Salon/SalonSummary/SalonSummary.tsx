import { Dimensions, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
const screenWidth = Dimensions.get("screen").width;
function SalonSummary() {
  const meetingCtx = useContext(MeetingsContext);
  const targetCtx = useContext(SaloonContext);

  const { todayPercentage, weeklyPercentage, monthlyPercentage } =
    useGetPercentage();

  const data = {
    labels: ["Dziś", "Tydzień", "Miesiąc"],

    data: [todayPercentage, weeklyPercentage, monthlyPercentage],
  };

  const chartConfig = {
    backgroundGradientFrom: "#efeeee",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#e3e3e3",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(10, 51, 261, ${opacity})`,
    strokeWidth: 3,
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
