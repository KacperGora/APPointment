import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { colors } from "../../../../colors";

export function getRingChartConfig() {
  return {
    backgroundGradientFrom: "#efeeee",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: colors.white,
    propsForLabels: { fill: colors.greydark },
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0,0,1,${opacity})`,
  };
}

export function getRingChartData(item) {
  const progressChartData: ProgressChartData = {
    data: [
      item.data.todayPercentage,
      item.data.weeklyPercentage,
      item.data.monthlyPercentage,
    ],
    colors: [
      "rgba(118, 190, 208,1)",
      "rgba(247, 203, 21,1)",
      "rgba(245, 93, 62,1)",
    ],
  };
  return progressChartData;
}

export function getCardEarningFooter(item, colors) {
  const data = [
    {
      id: 1,
      periodFirstLetter: "D",
      earning: item.data.todayEarnings,
      percentage: item.data.todayPercentage,
      color: colors[0],
    },
    {
      id: 2,
      periodFirstLetter: "T",
      earning: item.data.weeklyEarnings,
      percentage: item.data.weeklyPercentage,
      color: colors[1],
    },
    {
      id: 3,
      periodFirstLetter: "M",
      earning: item.data.thisMonthEarnings,
      percentage: item.data.monthlyPercentage,
      color: colors[2],
    },
  ];
  return data;
}
