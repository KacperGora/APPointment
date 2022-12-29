import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { ScreenWidth } from "../../../shared";
import CardEarningFooter from "./components/CardEarningFooter";
import CardHeader from "../CardHeader";
import { getRingChartConfig, getRingChartData } from "./config/ringChartConfig";
const RingChartCard = ({ item }) => {
  const chartConfigTheme = useRef(getRingChartConfig());
  const progressChartData = useRef(getRingChartData(item));

  return (
    <View style={styles.container}>
      <CardHeader item={item} />
      <ProgressChart
        data={progressChartData.current}
        width={ScreenWidth - 48}
        hideLegend
        height={250}
        strokeWidth={12}
        withCustomBarColorFromData={true}
        radius={40}
        chartConfig={chartConfigTheme.current}
        style={{ alignSelf: "center" }}
      />
      <CardEarningFooter
        item={item}
        colors={progressChartData.current.colors}
      />
    </View>
  );
};
export default RingChartCard;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    margin: 8,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
    shadowColor: "lightgray",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    width: ScreenWidth - 16,
  },
});
