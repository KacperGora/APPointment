import React from "react";
import ModalDropdown from "react-native-modal-dropdown";
const TimelineViewPicker = ({ setUserPickedView }) => {
  const onSelectHandler = (e: any, val: any) => {
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
    <ModalDropdown
      onSelect={onSelectHandler}
      options={["Dzień", "Trzy dni", "Dni pracujące", "Pełny tydzień"]}
      animated={true}
      defaultValue={"Pełny Tydzień"}
      isFullWidth={true}
      dropdownStyle={{ height: "auto" }}
    />
  );
};

export default TimelineViewPicker;
