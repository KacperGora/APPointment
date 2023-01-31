import React from "react";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";
import { CalendarStripProps } from "../../../../types";
import { colors } from "../../../colors";
import { FontAwesome5 } from "@expo/vector-icons";

export function getCalendarStripConfig(): CalendarStripProps {
  const calendarStripConfig: CalendarStripProps = {
    style: {
      height: 100,
      flex: 1,
      borderBottomColor: "lightgray",
      borderBottomWidth: 0.3,
    },
    calendarAnimation: { type: "sequence", duration: 30 },
    daySelectionAnimation: {
      type: "border",
      duration: 200,
      borderWidth: 1,
      borderHighlightColor: colors.primary,
    },
    calendarHeaderStyle: {
      color: "gray",
      textTransform: "capitalize",
    },
    highlightDateContainerStyle: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      opacity: 0.8,
    },

    dateNumberStyle: { color: "black" },
    dateNameStyle: { color: "gray", fontSize: 10 },
    highlightDateNameStyle: { color: "white", fontSize: 10 },
    highlightDateNumberStyle: { color: "white", fontSize: 12 },
    disabledDateNameStyle: { color: "grey" },
    disabledDateNumberStyle: { color: "grey" },
  };
  return calendarStripConfig;
}
export const getActiveTileStyle = () => {
  const style: ViewStyle = {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.greydark,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    transform: [{ scaleX: 1.052 }],
  };
  const textStyle: TextStyle = {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  };
  return { style, textStyle };
};

export const getSummaryColumnsData = (data) => {
  const firstCol = {
    title: {
      value: data?.serviceValue,
      styling: { fontWeight: "600", fontSize: 16 },
    },
    subTitle: { value: data?.customerName },
    detail: `Pracownik: ${data?.worker}`,
  };

  const secondCol = {
    title: {
      value: data?.dateString,
      styling: { fontWeight: "500", fontSize: 10, alignSelf: "flex-end" },
    },
    subTitle: {
      value: {
        start: data?.startHour,
        end: data?.endHour,
      },
      styling: { alignSelf: "flex-end", fontSize: 12, marginBottom: 4 },
    },
    detail: data.submitHandler ? (
      <Pressable
        onPress={data?.submitHandler}
        style={({ pressed }) => {
          return [
            pressed && { opacity: 0.3 },
            {
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.3,
              borderColor: colors.tertiary,
              shadowColor: "lightgray",
              shadowOffset: { height: 2, width: 4 },
              backgroundColor: "white",
              shadowOpacity: 0.4,
              shadowRadius: 2,
              borderRadius: 12,
              paddingHorizontal: 6,
              paddingVertical: 12,
              justifyContent: "space-evenly",
            },
          ];
        }}
      >
        <Text style={{ marginRight: 6, color: "black", fontWeight: "600" }}>
          {data?.servicePrice}
        </Text>
        <FontAwesome5 name="calendar-check" size={20} color={colors.primary} />
      </Pressable>
    ) : null,
  };

  return { firstCol, secondCol };
};
export function getSelectiveOptions(selectiveOptionsData) {
  const {
    workers,
    setWorkers,
    services,
    setServices,
    availableHours,
    selectiveOptionsPressHandler,
    setAvailableHours,
    pickedService,
  } = selectiveOptionsData;
  const cfg = [
    {
      id: 3,
      data: workers,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, workers, setWorkers),
      render: true,
    },
    {
      id: 2,
      data: services,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, services, setServices),
      render: true,
    },
    {
      id: 1,
      data: availableHours,
      pressHandler: (index: number) =>
        selectiveOptionsPressHandler(index, availableHours, setAvailableHours),
      render: pickedService ? true : false,
    },
  ];
  return cfg;
}
