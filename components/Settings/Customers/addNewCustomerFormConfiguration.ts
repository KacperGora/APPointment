import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputConfig = {
  name: string;
  id: number;
  keyboardType: KeyboardTypeOptions;
  autoFocus: boolean;
  returnKeyType: ReturnKeyTypeOptions;
  ref?: any;
  onSubmitEditing?: () => {};
  numberOfLines?: number;
  onChange?: (value) => void;
  value: string;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  icon: any;
  maxLength?: number;
}[];
type Returns = {
  inputConfig: InputConfig;
  resetInputs: () => void;
  fullName: string;
  phoneNumber: string;
  additionalInfo: string;
};

export const addNewCustomerFormConfiguration = (): Returns => {
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const resetInputs = () => {
    setFullName("");
    setPhoneNumber("");
    setAdditionalInfo("");
    Keyboard.dismiss();
  };
  console.log(fullName);
  const inputConfig: InputConfig = [
    {
      name: "Imię i nazwisko",
      id: 1,
      keyboardType: "default",
      autoFocus: false,
      returnKeyType: "next",
      // @ts-ignore: Unreachable code error
      onSubmitEditing: () => ref_input2.current.focus(),
      onChange: (value) => setFullName(value),
      value: fullName,
      autoCapitalize: "words",
      icon: "person-outline",
    },

    {
      name: "Numer telefonu",
      id: 2,
      keyboardType: "numbers-and-punctuation",
      autoFocus: false,
      ref: ref_input2,
      returnKeyType: "next",
      // @ts-ignore: Unreachable code error
      onSubmitEditing: () => ref_input3.current.focus(),
      onChange: (value) => setPhoneNumber(value),
      value: phoneNumber,
      icon: "ios-phone-portrait-outline",
      maxLength: 9,
    },
    {
      name: "Uwagi",
      id: 3,
      keyboardType: "default",
      autoFocus: false,
      ref: ref_input3,
      onSubmitEditing: () => Keyboard.dismiss,
      returnKeyType: "next",
      onChange: (value) => setAdditionalInfo(value),
      value: additionalInfo,
      autoCapitalize: "sentences",
      icon: "md-information-circle-outline",
    },
  ];
  return { inputConfig, fullName, phoneNumber, additionalInfo, resetInputs };
};
