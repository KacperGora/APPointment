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
import { SafeAreaView } from "react-native-safe-area-context";
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
import { colors } from "../../colors";
import RingChart from "./RingChart";
import { SaloonContext } from "../../../store/SaloonStore";
import ServiceCounter from "./ServiceCounter";

function SalonSummary() {
  const targetCtx = useContext(SaloonContext);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <RingChart />
      <ServiceCounter />
    </SafeAreaView>
  );
}

export default SalonSummary;
