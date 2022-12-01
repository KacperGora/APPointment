import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SalonSummary from "../../components/Salon/SalonSummary/SalonSummary";
import SalonCustomers from "../../components/Salon/SalonCustomers/SalonCustomers";

const SalonCustomersScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SalonCustomers />
    </>
  );
};

export default SalonCustomersScreen;
