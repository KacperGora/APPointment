import { colors } from "../../../../colors";

export function getBarChartConfig() {
  return {
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
}
