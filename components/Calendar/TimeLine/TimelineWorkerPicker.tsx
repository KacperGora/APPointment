import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
type TimelineWorkerPickerProps = {
  setWorker: any;
  addingEvent?: boolean;
};
const TimelineWorkerPicker: React.FC<TimelineWorkerPickerProps> = ({
  setWorker,
  addingEvent,
}) => {
  const onSelectHandler = (e: any, val: any) => {
    switch (val) {
      case "Wszyscy": {
        setWorker("all");
        break;
      }
      case "Justi": {
        setWorker("Justyna");
        break;
      }
      case "Monia": {
        setWorker("Monika");
        break;
      }

      default:
        break;
    }
  };
  return (
    <ModalDropdown
      onSelect={onSelectHandler}
      options={addingEvent ? ["Justi", "Monia"] : ["Wszyscy", "Justi", "Monia"]}
      defaultValue={addingEvent ? "Justi" : "Wszyscy"}
      // dropdownStyle={{ height: "auto" }}
    />
  );
};

export default TimelineWorkerPicker;
