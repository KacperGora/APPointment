import { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import {
  InputConfig,
  NewCustomerConfigurationFnReturnedValue,
} from "../../../../types";
import {
  validateFullName,
  validatePhoneNumber,
} from "../../../../Utils/validation/regexValidation";

export const addNewCustomerFormConfiguration = (
  customerName
): NewCustomerConfigurationFnReturnedValue => {
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();
  const [fullName, setFullName] = useState(customerName || "");
  const [nameBlurred, setNameBlurred] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const resetInputs = () => {
    setFullName("");
    setPhoneNumber("");
    setAdditionalInfo("");
    setPhoneBlurred(false);
    setNameBlurred(false);
    Keyboard.dismiss();
  };

  const inputConfig: InputConfig = [
    {
      name: "Imię i nazwisko",
      id: 1,
      keyboardType: "default",
      autoFocus: false,
      returnKeyType: "next",
      multiline: false,
      onSubmitEditing: () => ref_input2.current.focus(),
      onChange: (value) => setFullName(value),
      value: fullName,
      autoCapitalize: "words",
      icon: "person-outline",
      error: nameBlurred && !validateFullName(fullName),
      errorText: "Nieprawidłowe imię i nazwisko",
      onBlur: () => setNameBlurred(true),
      onFocus: () => setNameBlurred(false),
    },

    {
      name: "Numer telefonu",
      id: 2,
      keyboardType: "numbers-and-punctuation",
      autoFocus: false,
      ref: ref_input2,
      multiline: false,
      returnKeyType: "next",
      onSubmitEditing: () => ref_input3.current.focus(),
      onChange: (value) => setPhoneNumber(value),
      value: phoneNumber,
      icon: "ios-phone-portrait-outline",
      maxLength: 9,
      error: phoneBlurred && !validatePhoneNumber(phoneNumber),
      errorText: "Nieprawidłowy numer telefonu",
      onBlur: () => setPhoneBlurred(true),
      onFocus: () => setPhoneBlurred(false),
    },
    {
      name: "Uwagi",
      id: 3,
      keyboardType: "default",
      autoFocus: false,
      ref: ref_input3,
      onSubmitEditing: () => Keyboard.dismiss(),
      returnKeyType: "default",
      multiline: true,
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
