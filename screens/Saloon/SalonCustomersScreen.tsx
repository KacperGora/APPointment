import React from "react";
import SalonCustomers from "../../components/Salon/SalonCustomers";
import MyStatusBar from "../../components/UI/StatusBar/MyStatusBar";

const SalonCustomersScreen = () => {
  return (
    <MyStatusBar>
      <SalonCustomers />
    </MyStatusBar>
  );
};

export default SalonCustomersScreen;
