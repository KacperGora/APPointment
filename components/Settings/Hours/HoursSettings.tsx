import { eachHourOfInterval } from "date-fns";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SaloonContext } from "../../../store/SaloonStore";
const HoursSettings = () => {
  const ctx = useContext(SaloonContext);
  const result = eachHourOfInterval({
    start: new Date(2022, 11, 23, 7, 0),
    end: new Date(2022, 11, 23, 23),
  });

  const hours = [];
  result.forEach((res) =>
    hours.push({
      label: res.toISOString().split("T")[1].slice(0, 5),
      value: res.toISOString().split("T")[1].slice(0, 5),
    })
  );
  const [days, setDays] = useState([
    {
      fullName: "Niedziela",
      shortName: "Nd.",
      isActive: false,
      disabled: false,
      id: 0,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Poniedziałek",
      shortName: "Pon.",
      isActive: true,
      disabled: false,
      id: 1,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Wtorek",
      shortName: "Wt.",
      isActive: false,
      disabled: false,
      id: 2,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Środa",
      shortName: "Śr.",
      isActive: false,
      disabled: false,
      id: 3,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Czwartek",
      shortName: "Czw.",
      isActive: false,
      disabled: false,
      id: 4,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Piątek",
      shortName: "Pt.",
      isActive: false,
      disabled: false,
      id: 5,
      hours: { start: "07:00", end: "16:00" },
    },
    {
      fullName: "Sobota",
      shortName: "Sb.",
      isActive: false,
      disabled: false,
      id: 6,
      hours: { start: "07:00", end: "16:00" },
    },
  ]);
  const unav = {};
  days.forEach(
    (day) => (unav[+day.id] = [{ start: day.hours.start, end: day.hours.end }])
  );

  const disableSpecificDay = (index: number) => {
    setDays((curr) =>
      curr.map((day) => {
        if (day.id === index) {
          return { ...day, disabled: !day.disabled };
        }
        return day;
      })
    );
  };
  const hourStartChangeHandler = (day, value, index) => {
    setDays((curr) =>
      curr.map((day) => {
        if (day.id === index) {
          return { ...day, hours: { ...day.hours, start: value } };
        }
        return day;
      })
    );
  };

  const hourEndChangeHandler = (day, value, index) => {
    setDays((curr) =>
      curr.map((day) => {
        if (day.id === index) {
          return { ...day, hours: { ...day.hours, end: value } };
        }
        return day;
      })
    );
  };
  return (
    <View>
      <View style={{ marginHorizontal: 4 }}>
        <Text style={{ alignSelf: "flex-end" }}>Zastosuj do wszystkich</Text>
        {days.map((day, index) => (
          <View
            key={Math.random()}
            style={[styles.dayContainer, day.disabled && styles.disabled]}
          >
            <View
              style={{
                marginRight: 12,
                width: 115,
              }}
            >
              <Text style={styles.dayText}>{day.fullName}:</Text>
            </View>
            <View style={{ width: 50 }}>
              <RNPickerSelect
                onValueChange={(value) =>
                  hourStartChangeHandler(day, value, index)
                }
                items={hours}
                placeholder={{}}
                value={day.hours.start}
              />
            </View>
            <View style={{ width: 25 }}>
              <Text>do</Text>
            </View>
            <View style={{ width: 50 }}>
              <RNPickerSelect
                onValueChange={(value) =>
                  hourEndChangeHandler(day, value, index)
                }
                items={hours}
                placeholder={{}}
                value={day.hours.end}
              />
            </View>
            <View style={{ width: 75, alignItems: "center" }}>
              <Pressable
                style={{ width: 60 }}
                onPress={() => disableSpecificDay(index)}
              >
                {day.disabled ? <Text>Włącz</Text> : <Text> Wyłącz</Text>}
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default HoursSettings;
const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 350,
    marginVertical: 8,
    marginHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    padding: 8,
  },
  dayText: {
    fontWeight: "600",
    marginRight: 12,
    fontSize: 16,
  },
  disabled: {
    backgroundColor: "lightgray",
  },
});
