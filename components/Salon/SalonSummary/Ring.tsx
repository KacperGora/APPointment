import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
import { colors } from "../../colors";
import { ScreenWidth } from "../../shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";
const Ring = ({ item }) => {
  const navigation = useNavigation();
  const {
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
    thisMonthEarnings,
    todayEarnings,
    weeklyEarnings,
  } = useGetPercentage();

  const data: ProgressChartData = {
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

  const chartConfig: AbstractChartConfig = {
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
      <View
        style={{
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{item.title}</Text>
        </View>
        <Ionicons
          name={item.iconName}
          size={24}
          color="#ec368e92"
          onPress={() => navigation.navigate(item.navDestination)}
        />
      </View>
      <ProgressChart
        data={data}
        width={ScreenWidth}
        hideLegend
        height={250}
        strokeWidth={12}
        withCustomBarColorFromData={true}
        radius={40}
        chartConfig={chartConfig}
        style={{ alignSelf: "center" }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: "rgba(118, 190, 208,1)",
              borderRadius: 50,
            }}
          />
          <View>
            <Text>{todayEarnings} PLN</Text>
            <Text>{item.data.todayPercentage.toString().split(".")[1]} %</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: "rgba(247, 203, 21,1)",
              borderRadius: 50,
            }}
          />
          <View>
            <Text>{weeklyEarnings} PLN</Text>
            <Text>{item.data.weeklyPercentage.toString().split(".")[1]} %</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: "rgba(245, 93, 62,1)",
              borderRadius: 50,
            }}
          />
          <View>
            <Text>{thisMonthEarnings} PLN</Text>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: "red",
                opacity: 0.5,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                left: 36,
                bottom: 32,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 10 }}
              >
                {item.data.monthlyPercentage.toString().split(".")[1]}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Ring;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    margin: 8,
    padding: 14,
    shadowColor: "lightgray",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    backgroundColor: "white",
    width: ScreenWidth - 16,
  },
  heading: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.greydark,
    // letterSpacing: 1.2,
  },
  headingContainer: {
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fbcd7761",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
