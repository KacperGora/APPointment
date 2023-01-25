import React from "react";
import { View } from "react-native";
import { colors } from "../../colors";
import { Ionicons } from "@expo/vector-icons";
const SearchButton = ({ onPress }) => {
  return (
    <View
      style={{
        backgroundColor: colors.accent,
        opacity: 0.8,
        borderRadius: 12,
        width: 40,
        height: 40,
      }}
    >
      <Ionicons
        name="md-search"
        size={24}
        color="white"
        onPress={onPress}
        style={{ alignSelf: "center", justifyContent: "center", marginTop: 6 }}
      />
    </View>
  );
};
export default SearchButton;
