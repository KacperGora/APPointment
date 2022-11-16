import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
const TimelineViewPicker = ({ setUserPickedView }) => {
  const onSelectHandler = (e: any, val: any) => {
    console.log(val);
    switch (val) {
      case "Dzień": {
        setUserPickedView("day");
        break;
      }
      case "Trzy dni": {
        setUserPickedView("threeDays");
        break;
      }
      case "Dni pracujące": {
        setUserPickedView("workWeek");
        break;
      }
      case "Pełny tydzień": {
        setUserPickedView("week");
        break;
      }
      default:
        break;
    }
  };
  return (
    <View
      style={{
        alignItems: "flex-end",
        padding: 20,
      }}
    >
      <ModalDropdown
        onSelect={onSelectHandler}
        options={["Dzień", "Trzy dni", "Dni pracujące", "Pełny tydzień"]}
        animated={false}
        defaultValue={"Pełny Tydzień"}
      />
    </View>
  );
};

export default TimelineViewPicker;
