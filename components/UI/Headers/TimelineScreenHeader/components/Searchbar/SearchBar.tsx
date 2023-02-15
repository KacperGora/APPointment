import React, { useRef, useState } from "react";
import { LayoutAnimation, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../../colors";
import { RowContainer, StyledTextInput } from "../../../../../shared";
import { SearchBarProps } from "../../../../../../types";
import SearchButton from "../../../../Buttons/SearchButton";

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchBarVisible,
  searchPressHandler,
}) => {
  const [searchedValue, setSearchedValue] = useState("");
  const onInputChangeHandler = (e: string) => {
    setSearchedValue(e);
  };
  const inputRef = useRef(null);
  const cancelPressHandler = () => {
    LayoutAnimation.easeInEaseOut();
    inputRef.current.clear();
    !!setSearchBarVisible && setSearchBarVisible(false);
    searchPressHandler("");
  };

  return (
    <RowContainer
      style={{
        paddingVertical: 10,
      }}
    >
      <StyledTextInput
        style={{
          elevation: 14,
          shadowColor: "lightgray",
          shadowOffset: { height: 1, width: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }}
        placeholder="Szukaj"
        ref={inputRef}
        onChangeText={onInputChangeHandler}
        placeholderTextColor="lightgray"
        onSubmitEditing={() => searchPressHandler(searchedValue)}
        returnKeyType="search"
        autoFocus={true}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          right: 4,
        }}
      >
        <MaterialIcons
          name="cancel"
          size={24}
          color={colors.gray}
          onPress={cancelPressHandler}
          style={{ marginRight: 12 }}
        />
        <SearchButton onPress={() => searchPressHandler(searchedValue)} />
      </View>
    </RowContainer>
  );
};
export default SearchBar;
