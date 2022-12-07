import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
import { colors } from "../../colors";
import { ScreenWidth } from "../../shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

import Ring from "./Ring";
import Carousel, { Pagination } from "react-native-snap-carousel";
const screenWidth = Dimensions.get("screen").width;
function RingChart() {
  const navigation = useNavigation();
  const renderItem = ({ item, index }) => {
    return <Ring item={item} />;
  };
  const {
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
    thisMonthEarnings,
    todayEarnings,
    weeklyEarnings,
  } = useGetPercentage();
  return (
    <View>
      <Carousel
        vertical={false}
        // layout="tinder"
        data={[
          {
            title: "Przychody",
            data: {
              todayPercentage,
              weeklyPercentage,
              monthlyPercentage,
            },
            iconName: "settings",
            navDestination: "Ustawienia",
          },
          {
            title: "Wydatki",
            data: {
              todayPercentage: 0.45,
              weeklyPercentage: 0.2,
              monthlyPercentage: 0.6,
            },
            iconName: "add",
            navDestination: "Ustawienia",
          },
          {
            title: "Dochody",
            data: {
              todayPercentage: 0.15,
              weeklyPercentage: 0.78,
              monthlyPercentage: 0.22,
            },
            iconName: "add",
            navDestination: "Ustawienia",
          },
        ]}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={400}
        // autoplay
        loop
        loopClonesPerSide={2}
      />
      {/* <Pagination
        dotsLength={3}
        activeDotIndex={1}
        containerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(132, 132, 132, 0.92)",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
}
export default RingChart;
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
    color: colors.gray,
    // letterSpacing: 1.2,
  },
});
