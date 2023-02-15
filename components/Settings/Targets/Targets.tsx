import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { db } from "../../../firebase/firebase";
import { SaloonContext } from "../../../store/SaloonStore";

import { colors } from "../../colors";
import RegularButton from "../../UI/Buttons/RegularButton";
import SmallText from "../../UI/Text/SmallText";
import TargetSlider from "./TargetSlider";

const Targets = () => {
  const salonCtx = useContext(SaloonContext);

  const dailyTargetRef = useRef(salonCtx.dailyTarget);
  const weeklyTargetRef = useRef(salonCtx.weeklyTarget);
  const monthlyTargetRef = useRef(salonCtx.monthlyTarget);
  const [targetText, setTargetText] = useState({
    daily: salonCtx.dailyTarget?.toString(),
    weekly: salonCtx.weeklyTarget?.toString(),
    monthly: salonCtx.monthlyTarget?.toString(),
  });

  const targetChangeHandler = (e: number, targetType: string) => {
    switch (targetType) {
      case "daily": {
        dailyTargetRef.current = e;
        setTargetText((currTarget) => {
          return {
            ...currTarget,
            daily: e.toString(),
          };
        });
        break;
      }
      case "weekly": {
        weeklyTargetRef.current = e;
        setTargetText((currTarget) => {
          return {
            ...currTarget,
            weekly: e.toString(),
          };
        });
        break;
      }
      case "monthly": {
        monthlyTargetRef.current = e;
        setTargetText((currTarget) => {
          return {
            ...currTarget,
            monthly: e.toString(),
          };
        });
        break;
      }
    }
  };

  const salonTargetData = {
    dailyTargets: dailyTargetRef.current,
    weeklyTargets: weeklyTargetRef.current,
    monthlyTargets: monthlyTargetRef.current,
  };

  const buttonPressHandler = async () => {
    await setDoc(doc(db, "salon settings", "targets"), salonTargetData);
  };

  return (
    <View
      style={{
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
        // width: ScreenWidth - 16,
      }}
    >
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{ fontSize: 24, fontWeight: "600", color: colors.greydark }}
        >
          Ustaw target
        </Text>
      </View>
      <View
        style={{
          margin: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TargetSlider
          targetTypeString={"Dzienny"}
          sliderHandler={(e: number) => targetChangeHandler(e, "daily")}
          value={+targetText.daily}
        />

        <SmallText>{targetText.daily} PLN</SmallText>
      </View>

      <View style={{ margin: 12, flexDirection: "row", alignItems: "center" }}>
        <TargetSlider
          targetTypeString={"Tygodniowy"}
          sliderHandler={(e: number) => targetChangeHandler(e, "weekly")}
          value={+targetText.weekly}
        />

        <Text>{weeklyTargetRef.current} PLN</Text>
      </View>
      <View style={{ margin: 12, flexDirection: "row", alignItems: "center" }}>
        <TargetSlider
          targetTypeString={"Miesięczny"}
          sliderHandler={(e: number) => targetChangeHandler(e, "monthly")}
          value={+targetText.monthly}
        />

        <Text>{monthlyTargetRef.current} PLN</Text>
      </View>
      <RegularButton
        textStyles={{
          color: "white",
          textTransform: "uppercase",
          fontSize: 12,
        }}
        btnStyles={{
          // alignSelf: "center",
          marginHorizontal: 24,
        }}
        onPress={buttonPressHandler}
        title="Zatwierdź"
        primary
      />
    </View>
  );
};

export default Targets;
