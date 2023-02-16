import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Keyboard, LayoutAnimation } from "react-native";
import { TextInput } from "react-native-gesture-handler";
type SpendingType = {
  name: string;
  value: number;
  type: "spending" | "income";
  date: string;
  folder: string;
};
export const useGetSpendingFormConfig = (date) => {
  const [spendingName, setSpendingName] = useState("");
  const [spendingValue, setSpendingValue] = useState("");
  const costName = useRef<TextInput>();
  const costValue = useRef<TextInput>();
  const inputsData = [
    {
      id: 1,
      placeholder: "Nazwa",
      autoCorrect: true,
      onChangeText: setSpendingName,
      value: spendingName,
      ref: costName,
      keyboardType: "default",
      onSubmitEditing: () => costName?.current?.focus(),
    },
    {
      id: 2,
      placeholder: "Wartość",
      autoCorrect: false,
      onChangeText: setSpendingValue,
      value: spendingValue,
      ref: costValue,
      keyboardType: "numeric",
      onSubmitEditing: () => {
        LayoutAnimation.easeInEaseOut();
        Keyboard.dismiss();
      },
    },
  ];
  const data: SpendingType = {
    name: spendingName,
    value: +spendingValue,
    date: dayjs(date).format("DD.MM.YY"),
    folder: dayjs(date).format("MM-YYYY"),
    type: "spending",
  };
  return { data, inputsData };
};
export const getMonthsArr = () => {
  return Array.from({ length: 12 }, (e, i) => {
    return {
      short: new Date(null, i + 1, null).toLocaleDateString("pl", {
        month: "short",
      }),
      long: new Date(null, i + 1, null).toLocaleDateString("pl", {
        month: "long",
      }),
      index: i,
      folder: dayjs().set("month", i).format("MM-YYYY"),
    };
  });
};
export const getType = () => {
  return [
    { id: 1, type: "all", label: "wszystko" },
    { type: "income", id: 2, label: "wpływy" },
    { id: 3, type: "spending", label: "wydatki" },
  ];
};
