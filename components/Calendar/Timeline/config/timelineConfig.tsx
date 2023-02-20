import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { colors } from "../../../colors";
export const getFloatingButtonActions = () => {
  return [
    {
      text: "Dodaj spotkanie",
      name: "Meeting",
      icon: <AntDesign name="calendar" size={24} color="white" />,
      position: 1,
      color: colors.secondary,
    },
    {
      text: "Dodaj klienta",
      name: "Customer",
      icon: <AntDesign name="adduser" size={24} color="white" />,
      position: 2,
      color: colors.secondary,
    },
  ];
};
