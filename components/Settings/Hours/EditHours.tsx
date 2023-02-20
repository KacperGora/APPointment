import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { OpeningHours } from "../../../types";
const EditHours = ({ days, items, hoursChangeHandler }) => {
  const [manageDays, setManageDays] = useState<OpeningHours>(days);
  const toggleSwitch = (value, arrIndex) => {
    const dirtyDays = [...manageDays];
    dirtyDays[arrIndex].isActive = !dirtyDays[arrIndex].isActive;
    setManageDays(dirtyDays);
  };

  return (
    <>
      {manageDays.map((day, arrIndex) => {
        return (
          <View
            key={Math.random()}
            style={{
              flexDirection: "row",
              marginHorizontal: 12,
              borderBottomWidth: 0.5,
              paddingVertical: 12,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text style={{ width: 100, fontWeight: "600" }}>
              {day.fullName}:
            </Text>

            <View style={{ flexDirection: "row", marginHorizontal: 6 }}>
              <View style={{ marginHorizontal: 8, padding: 6 }}>
                <RNPickerSelect
                  placeholder={{ label: "wybierz", value: "09:00" }}
                  items={items}
                  onValueChange={(value) =>
                    hoursChangeHandler(arrIndex, value, "start")
                  }
                />
              </View>
              <View style={{ marginHorizontal: 8, padding: 6 }}>
                <RNPickerSelect
                  placeholder={{ label: "wybierz", value: "09:00" }}
                  items={items}
                  onValueChange={(value) =>
                    hoursChangeHandler(arrIndex, value, "end")
                  }
                />
              </View>
            </View>

            <Switch
              trackColor={{ false: "#767577", true: "#c6c6c6" }}
              thumbColor={"#dedede"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => toggleSwitch(value, arrIndex)}
              value={day.isActive}
            />
          </View>
        );
      })}
    </>
  );
};
export default EditHours;
