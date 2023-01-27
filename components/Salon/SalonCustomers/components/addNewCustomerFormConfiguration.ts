import { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import {
  InputConfig,
  NewCustomerConfigurationFnReturnedValue,
} from "../../../types";

export const addNewCustomerFormConfiguration = (
  customerName
): NewCustomerConfigurationFnReturnedValue => {
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();
  const [fullName, setFullName] = useState(customerName || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const resetInputs = () => {
    setFullName("");
    setPhoneNumber("");
    setAdditionalInfo("");
    Keyboard.dismiss();
  };

  const inputConfig: InputConfig = [
    {
      name: "Imię i nazwisko",
      id: 1,
      keyboardType: "default",
      autoFocus: false,
      returnKeyType: "next",

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
  return {
    inputConfig,
    fullName,
    phoneNumber,
    additionalInfo,
    resetInputs,
  };
};
