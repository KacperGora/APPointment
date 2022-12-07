import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

import { stackChartViewData } from "../../../data";
import { colors } from "../../colors";
import { ScreenWidth } from "../../shared";
import ModalDropdownComponent from "../../UI/ModalDropdown/ModalDropdown";

import useServiceCounter from "./ServiceCounter";

const StackedChart = () => {
  const { meetingsServiceThisWeek, meetingsServiceThisMonth } =
    useServiceCounter();
  const [view, setView] = useState("Miesiąc");

  const monthlyData = [
    meetingsServiceThisMonth["Manicure Klasyczny"],
    meetingsServiceThisMonth["Manicure Hybrydowy"],
    meetingsServiceThisMonth["Uzupełnienie żelowe"],
    meetingsServiceThisMonth["Przedłużenie paznokci żelem"],
    meetingsServiceThisMonth["Pedicure"],
  ];
  const weeklyData = [
    meetingsServiceThisWeek["Manicure Klasyczny"] || 0,
    meetingsServiceThisWeek["Manicure Hybrydowy"] || 0,
    meetingsServiceThisWeek["Uzupełnienie żelowe"] || 0,
    meetingsServiceThisWeek["Przedłużenie paznokci żelem"] || 0,
    meetingsServiceThisWeek["Pedicure"] || 0,
  ];

  const data: ChartData = {
    labels: ["Klasyczny", "Hybrydowy", "U. żelowe", "P. żelem", "Pedicure"],

    datasets: [
      {
        data: view === "Miesiąc" ? monthlyData : weeklyData,
      },
    ],
  };

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    color: (opacity = 1) => colors.primary,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false, // optional
    backgroundColor: "white",
    labelColor: () => "black",
    propsForVerticalLabels: { fontSize: 10 },
  };
  return (
    <View style={styles.container}>
      <View style={styles.chartHeader}>
        <Text>Usługi w tygodniu</Text>
        <ModalDropdownComponent
          data={stackChartViewData}
          setHandler={setView}
        />
      </View>
      <BarChart
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        data={data}
        showValuesOnTopOfBars
        width={ScreenWidth - 48}
        style={{ paddingRight: 4 }}
        height={200}
        // yLabelsOffset={50}
        chartConfig={chartConfig}
      />
    </View>
  );
};
export default StackedChart;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    margin: 8,
    padding: 16,
    shadowColor: "lightgray",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    backgroundColor: "white",
  },
  chartHeader: { flexDirection: "row", justifyContent: "space-between" },
});
