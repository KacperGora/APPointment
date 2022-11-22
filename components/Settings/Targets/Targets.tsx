import React, { useContext } from "react";
import { View } from "react-native";
import { SaloonContext } from "../../../store/SaloonStore";
import TargetSlider from "./TargetSlider";

const Targets = () => {
  const targetCtx = useContext(SaloonContext);
  const dailyTargetHandler = (e) => {
    targetCtx.changeTargetHandler(e.toFixed(), "daily");
  };
  const weeklyTargetHandler = (e) => {
    targetCtx.changeTargetHandler(e.toFixed(), "weekly");
  };
  const monthlyTargetHandler = (e) => {
    targetCtx.changeTargetHandler(e.toFixed(), "monthly");
  };
  console.log(targetCtx.dailyTarget);
  return (
    <View>
      <TargetSlider
        targetTypeString={"dzienny"}
        targetTypeState={targetCtx.dailyTarget}
        sliderHandler={dailyTargetHandler}
      />
      <TargetSlider
        targetTypeString={"tygodniowy"}
        targetTypeState={targetCtx.weeklyTarget}
        sliderHandler={weeklyTargetHandler}
      />
      <TargetSlider
        targetTypeString={"miesięczny"}
        targetTypeState={targetCtx.monthlyTarget}
        sliderHandler={monthlyTargetHandler}
      />
    </View>
  );
};

export default Targets;
