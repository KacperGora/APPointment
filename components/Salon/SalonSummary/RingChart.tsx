import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
import { colors } from "../../colors";

const screenWidth = Dimensions.get("screen").width;
function RingChart() {
  const { todayPercentage, weeklyPercentage, monthlyPercentage } =
    useGetPercentage();

  const data = {
    labels: ["Dzień", "Tydzień", "Miesiąc"], // optional
    data: [todayPercentage, weeklyPercentage, monthlyPercentage],
    colors: [
      "rgba(118, 190, 208,1)",
      "rgba(247, 203, 21,1)",
      "rgba(245, 93, 62,1)",
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#efeeee",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: colors.white,
    propsForLabels: { fill: colors.greydark },
    decimalPlaces: 2,
    color: (opacity = 1, _index) => `rgba(0,0,1,${opacity})`,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Przychody</Text>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={250}
        strokeWidth={15}
        withCustomBarColorFromData={true}
        radius={40}
        chartConfig={chartConfig}
        style={{ position: "relative", right: 24 }}
        hasLegend={false}
        hideLegend={false}
      />
    </View>
  );
}
export default RingChart;
const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  heading: {
    fontWeight: "600",
    fontSize: 24,
    color: colors.greydark,
    letterSpacing: 1.2,
  },
});
