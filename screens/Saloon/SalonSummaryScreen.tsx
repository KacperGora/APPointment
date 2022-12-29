import React from "react";
import SalonSummary from "../../components/Salon/SalonSummary/SalonSummary";
import MyStatusBar from "../../components/UI/StatusBar/MyStatusBar";

const SalonSummaryScreen = () => {
  return (
    <MyStatusBar>
      <SalonSummary />
    </MyStatusBar>
  );
};

export default SalonSummaryScreen;
