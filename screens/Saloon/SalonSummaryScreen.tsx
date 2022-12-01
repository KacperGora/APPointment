import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SalonSummary from "../../components/Salon/SalonSummary/SalonSummary";

const SalonSummaryScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SalonSummary />
    </>
  );
};

export default SalonSummaryScreen;
