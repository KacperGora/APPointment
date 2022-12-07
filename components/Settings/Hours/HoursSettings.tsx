import { eachHourOfInterval, eachMinuteOfInterval } from "date-fns";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { openingHours } from "../../../data";
import { SaloonContext } from "../../../store/SaloonStore";
import RegularButton from "../../Buttons/RegularButton";
import { hours } from "../../../data";
import EditHours from "./EditHours";

const HoursSettings = () => {
  const ctx = useContext(SaloonContext);
  const [days, setDays] = useState(openingHours);

  const [edit, setEdit] = useState(false);
  const items = hours.map((hour) => {
    return { value: hour.value, label: hour.value };
  });
  const today = new Date(new Date().setHours(0, 0, 0));
  const todayEnd = new Date(new Date().setHours(23, 59, 0));
  // console.log(todayEnd);
  const end = new Date(
    new Date().setHours(
      +days[0].hours.start.split(":")[0],
      +days[0].hours.start.split(":")[1],
      0
    )
  );

  const result = eachMinuteOfInterval(
    {
      start: today,
      end: end,
    },
    { step: 15 }
  );
  // console.log(
  //   result[0].toLocaleTimeString().slice(0, 5),
  //   result[result.length - 1].toLocaleTimeString().slice(0, 5)
  // );
  const yba = {};
  days.forEach((day, index) => {
    const todayStart = new Date(new Date().setHours(0, 0, 0));
    const todayEnd = new Date(new Date().setHours(24, 0, 0));
    const salonOpen = new Date(
      new Date().setHours(
        +day.hours.start.split(":")[0],
        +day.hours.start.split(":")[1],
        0
      )
    );

    const salonClose = new Date(
      new Date().setHours(
        +day.hours.end.split(":")[0],
        +day.hours.end.split(":")[1],
        0
      )
    );

    const unavStartResult = eachMinuteOfInterval(
      {
        start: todayStart,
        end: salonOpen,
      },
      { step: 15 }
    );
    const unavEndResult = eachMinuteOfInterval(
      {
        start: salonClose,
        end: todayEnd,
      },
      { step: 15 }
    );
    let fraction = +unavStartResult[unavStartResult.length - 1]
      .toLocaleTimeString()
      .slice(0, 5)
      .split(":")[1];
    if (fraction !== 0) fraction = (fraction / 15) * 0.25;

    yba[index] = [
      {
        start: 0,
        end:
          +unavStartResult[unavStartResult.length - 1]
            .toLocaleTimeString()
            .slice(0, 2) + fraction,
      },
      {
        start: +unavEndResult[0].toLocaleTimeString().slice(0, 2),
        end: +unavEndResult[unavEndResult.length - 1]
          .toLocaleTimeString()
          .slice(0, 2),
      },
    ];
  });

  const hoursChangeHandler = (
    daysIndex: number,
    hourValue: string,
    flag: string
  ) => {
    const dirtyDays = days;
    flag === "start"
      ? (dirtyDays[daysIndex].hours.start = hourValue)
      : (dirtyDays[daysIndex].hours.end = hourValue);
    setDays(dirtyDays);
  };
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 12,
        margin: 12,
        padding: 24,
        paddingVertical: 36,
        shadowColor: "lightgray",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: "white",
      }}
    >
      <EditHours
        days={days}
        items={items}
        hoursChangeHandler={hoursChangeHandler}
      />

      <RegularButton
        onPress={() => console.log("pressed")}
        textStyles={{
          color: "white",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
        btnStyles={{
          marginHorizontal: 6,
          marginVertical: 12,
          width: 200,
          alignSelf: "center",
        }}
      >
        Zatwierdź
      </RegularButton>
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
