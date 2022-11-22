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
      <View style={{ margin: 12 }}>
        <TargetSlider
          targetTypeString={"dzienny"}
          targetTypeState={targetCtx.dailyTarget}
          sliderHandler={dailyTargetHandler}
        />
      </View>
      <View style={{ margin: 12 }}>
        <TargetSlider
          targetTypeString={"tygodniowy"}
          targetTypeState={targetCtx.weeklyTarget}
          sliderHandler={weeklyTargetHandler}
        />
      </View>
      <View style={{ margin: 12 }}>
        <TargetSlider
          targetTypeString={"miesięczny"}
          targetTypeState={targetCtx.monthlyTarget}
          sliderHandler={monthlyTargetHandler}
        />
      </View>
    </View>
  );
};

export default Targets;