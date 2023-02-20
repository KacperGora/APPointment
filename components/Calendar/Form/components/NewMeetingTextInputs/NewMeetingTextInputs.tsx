import React from "react";
import { InputComponentProps } from "../../../../../types";
import { InputContainer } from "../../style/Form.style";
import { View } from "react-native";
import { TextInput as TextInputRNPaper } from "react-native-paper";

const TextInputs: React.FC<InputComponentProps> = ({ data, direction }) => {
  return (
    <InputContainer style={{ flexDirection: direction }}>
      {data.map((input) => {
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
              keyboardType={input.keyboardType}
              onSubmitEditing={input.onSubmitEditing}
              style={{
                backgroundColor: "white",
                fontSize: 14,
              }}
              outlineColor="lightgray"
              activeOutlineColor="#f764ab52"
              textAlign="center"
            />
          </View>
        );
      })}
    </InputContainer>
  );
};

export default TextInputs;
