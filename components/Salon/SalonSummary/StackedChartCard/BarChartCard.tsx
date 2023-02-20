import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ScreenWidth } from "../../../shared";
import CardHeader from "../CardHeader";
import { getBarChartConfig } from "./config/stackChartConfig";

const BarChartCard = ({ item }) => {
  const data = {
    labels: item.labels,
    datasets: [
      {
        data: item.datasets,
      },
    ],
  };

  const chartConfigTheme = useRef(getBarChartConfig());

  return (
    <View style={styles.container}>
      <CardHeader item={item} />
      <BarChart
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        data={data}
        showValuesOnTopOfBars
        width={ScreenWidth - 48}
        style={{ paddingRight: 4 }}
        height={250}
        chartConfig={chartConfigTheme.current}
      />
    </View>
  );
};
export default BarChartCard;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    margin: 8,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: "lightgray",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    width: ScreenWidth - 16,
  },
});
