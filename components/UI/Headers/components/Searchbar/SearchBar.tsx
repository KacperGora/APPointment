import React from "react";
import { TextInput } from "react-native";
import { colors } from "../../../../colors";
import { RowContainerSpaceBetween } from "../../../../shared";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const SearchBar = ({ setSearchBarVisible, searchIconPressHandler }) => {
  return (
    <RowContainerSpaceBetween style={{ padding: 12 }}>
      <TextInput
        style={{
          alignSelf: "center",
          borderWidth: 0.2,
          borderColor: colors.greydark,
          paddingHorizontal: 64,
          paddingVertical: 6,
          borderRadius: 8,
          width: "80%",
          textAlign: "center",
        }}
        placeholder="Szukaj"
        placeholderTextColor="lightgray"
        onSubmitEditing={() => setSearchBarVisible(false)}
      />
      <MaterialIcons
        name="cancel"
        size={24}
        color={colors.greydark}
        style={{ position: "relative", right: 30 }}
        onPress={() => setSearchBarVisible(false)}
      />
      <Ionicons
        name="md-search"
        size={24}
        color="gray"
        onPress={searchIconPressHandler}
      />
    </RowContainerSpaceBetween>
  );
};
export default SearchBar;
