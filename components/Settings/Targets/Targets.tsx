import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 12, flexDirection: "row", alignItems: "center" }}>
        <TargetSlider
          targetTypeString={"dzienny"}
          targetTypeState={targetCtx.dailyTarget}
          sliderHandler={dailyTargetHandler}
        />
        <Text>{targetCtx.dailyTarget}</Text>
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
