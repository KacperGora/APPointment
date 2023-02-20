import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import { LayoutAnimation } from "react-native";
import SalonSummary from "../../components/Salon/SalonSummary/SalonSummary";
import Navbar from "../../components/UI/Headers/TimelineScreenHeader/components/Navbar";
import TimelineScreenHeader from "../../components/UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import MyStatusBar from "../../components/UI/StatusBar/MyStatusBar";
import { Navigation } from "../../types";

const SalonSummaryScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <MyStatusBar>
      <TimelineScreenHeader
        onTodayIconPressHandler={() => {
          navigation.navigate("Tydzień");
        }}
        disableCalendar
        disableSearchBar
        monthName={dayjs().format("MMMM")}
      />
      <SalonSummary />
    </MyStatusBar>
  );
};

export default SalonSummaryScreen;
