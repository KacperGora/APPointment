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
