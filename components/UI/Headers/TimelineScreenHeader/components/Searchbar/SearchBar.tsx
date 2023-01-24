import React, { useRef, useState } from "react";
import { TextInput, LayoutAnimation } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../../colors";
import { RowContainerSpaceBetween } from "../../../../../shared";
import { useNavigation } from "@react-navigation/native";
import useFetchEvents from "../../../../../../hooks/calendar/useFetchEvents";
import { disableNetwork } from "firebase/firestore";

const SearchBar = ({ setSearchBarVisible, setSearchedEvents }) => {
  const { flatData } = useFetchEvents();
  const [searchedValue, setSearchedValue] = useState("");
  const onInputChangeHandler = (e: string) => {
    setSearchedValue(e);
  };
  const inputRef = useRef(null);
  const cancelPressHandler = () => {
    LayoutAnimation.linear();
    inputRef.current.clear();
    setSearchedEvents([]);
    setSearchBarVisible(false);
  };
  const searchPressHandler = () => {
    setSearchedEvents(
      flatData.filter(
        (el) =>
          el.title.toLowerCase().includes(searchedValue.toLowerCase()) ||
          el.serviceName.toLowerCase().includes(searchedValue.toLowerCase())
      )
    );
  };

  return (
    <RowContainerSpaceBetween>
      <TextInput
        style={{
          borderWidth: 0.2,
          borderColor: colors.greydark,
          paddingVertical: 6,
          marginBottom: 8,
          borderRadius: 12,
          flex: 1,
          textAlign: "center",
        }}
        placeholder="Szukaj"
        ref={inputRef}
        onChangeText={onInputChangeHandler}
        placeholderTextColor="lightgray"
        onSubmitEditing={searchPressHandler}
        returnKeyType="search"
      />
      <MaterialIcons
        name="cancel"
        size={24}
        color={colors.greydark}
        style={{ position: "relative", right: 30, bottom: 4 }}
        onPress={cancelPressHandler}
      />

      <Ionicons
        name="md-search"
        size={24}
        color="gray"
        onPress={searchPressHandler}
      />
    </RowContainerSpaceBetween>
  );
};
export default SearchBar;
