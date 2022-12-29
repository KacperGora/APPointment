import React from "react";
import { Button, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const SaloonCustomersListTools = ({
  iconPressHandler,
  searchInputValue,
  searchInputChangeHandler,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: 12,
        width: "100%",
        height: 50,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            borderColor: "lightgray",
            borderWidth: 0.5,
            borderRadius: 12,
            width: 150,
            padding: 12,
          }}
          onChangeText={searchInputChangeHandler}
          placeholder="Szukaj"
          placeholderTextColor="gray"
          value={searchInputValue}
        />
        {/* <Button title="Szukaj" /> */}
      </View>

      <View
        style={{
          marginRight: 12,
        }}
      >
        <AntDesign
          onPress={iconPressHandler}
          name="adduser"
          size={28}
          color="black"
        />
      </View>
    </View>
  );
};
export default SaloonCustomersListTools;
