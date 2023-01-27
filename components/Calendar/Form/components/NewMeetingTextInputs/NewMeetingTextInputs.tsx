import { colors } from "../../../../colors";
import React, { useRef } from "react";
import { InputComponentProps } from "../../../../../types";
import { InputContainer } from "../../style/Form.style";
import { Keyboard, LayoutAnimation, TextInput, View } from "react-native";
import { TextInput as TextInputRNPaper } from "react-native-paper";
const TextInputs: React.FC<InputComponentProps> = ({
  setUserTypedName,
  setUserTypedLastName,
  fullName,
  setShowSummary,
}) => {
  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const formTextInputsConfig = [
    {
      id: 1,
      placeholder: "Imię",
      autoCorrect: true,
      onChangeText: setUserTypedName,
      value: fullName.split(" ")[0].trim(),
      ref: firstNameInputRef,
      onSubmitEditing: () => lastNameInputRef?.current?.focus(),
    },
    {
      id: 2,
      placeholder: "Nazwisko",
      autoCorrect: false,
      onChangeText: setUserTypedLastName,
      value: fullName.split(" ")[1].trim(),
      ref: lastNameInputRef,
      onSubmitEditing: () => {
        setShowSummary(true);
        LayoutAnimation.easeInEaseOut();
        Keyboard.dismiss();
      },
    },
  ];

  return (
    <InputContainer>
      {formTextInputsConfig.map((input) => {
        return (
          <View key={input.id} style={{ flex: 1, marginVertical: 12 }}>
            <TextInputRNPaper
              mode="outlined"
              label={input.placeholder}
              onChangeText={input.onChangeText}
              key={input.id}
              autoCapitalize="words"
              placeholderTextColor="#9d9d9d"
              autoCorrect={input.autoCorrect}
              value={input.value}
              ref={input.ref}
              onSubmitEditing={input.onSubmitEditing}
              style={{
                backgroundColor: "white",
                fontSize: 14,
              }}
              outlineColor="lightgray"
              activeOutlineColor="#f764ab52"
              textAlign="center"
              textContentType="name"
            />
            {/* <View
              style={{
                position: "relative",
                top: 20,
                left: 20,
                backgroundColor: "white",
              }}
            >
              <Text>{input.placeholder}</Text>
            </View>
            <StyledInput
              key={input.id}
              autoCapitalize="words"
              placeholderTextColor="#9d9d9d"
              autoCorrect={input.autoCorrect}
              onChangeText={input.onChangeText}
              value={input.value}
              // ref={input.ref}
              onSubmitEditing={input.onSubmitEditing}
            /> */}
          </View>
        );
      })}
    </InputContainer>
  );
};

export default TextInputs;
