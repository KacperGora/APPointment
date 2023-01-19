import { colors } from "../../../../colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { InputComponentProps } from "../../../../../types";
import { InputContainer, StyledInput } from "../../style/Form.style";

const TextInputs: React.FC<InputComponentProps> = ({
  setUserTypedName,
  setUserTypedLastName,
  fullName,
}) => {
  const formTextInputsConfig = [
    {
      id: 1,
      placeholder: "Imię",
      autoCorrect: true,
      onChangeText: setUserTypedName,
      value: fullName.split(" ")[0].trim(),
    },
    {
      id: 2,
      placeholder: "Nazwisko",
      autoCorrect: false,
      onChangeText: setUserTypedLastName,
      value: fullName.split(" ")[1].trim(),
    },
  ];

  return (
    <InputContainer>
      <MaterialIcons name="account-circle" size={24} color={colors.primary} />
      {formTextInputsConfig.map((input) => {
        return (
          <StyledInput
            key={input.id}
            autoCapitalize="words"
            placeholderTextColor="#9d9d9d"
            placeholder={input.placeholder}
            autoCorrect={input.autoCorrect}
            onChangeText={input.onChangeText}
            value={input.value}
          />
        );
      })}
    </InputContainer>
  );
};

export default TextInputs;
