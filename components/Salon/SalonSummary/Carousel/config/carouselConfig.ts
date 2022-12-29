import { ViewStyle } from "react-native";
type Style = {
  container: ViewStyle;
  dotStyle: ViewStyle;
};
export function getPaginationParams(): Style {
  return {
    container: {
      marginBottom: -60,
      zIndex: 5,
      position: "relative",
      bottom: 70,
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "rgba(132, 132, 132, 0.92)",
    },
  };
}
