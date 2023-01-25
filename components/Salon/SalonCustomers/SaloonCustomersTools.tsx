import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../UI/Headers/TimelineScreenHeader/components/Searchbar/SearchBar";
import { RowContainer } from "../../shared";
import { LayoutAnimation, View } from "react-native";
import SearchButton from "../../UI/Buttons/SearchButton";
import { colors } from "../../colors";
const SaloonCustomersListTools = ({ iconPressHandler, searchPressHandler }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchButtonPressHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setShowSearchBar(true);
  };
  return (
    <RowContainer
      style={{ justifyContent: "space-between", marginHorizontal: 12 }}
    >
      {showSearchBar ? (
        <SearchBar
          setSearchBarVisible={setShowSearchBar}
          searchPressHandler={searchPressHandler}
        />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            paddingVertical: 4,
            paddingHorizontal: 4,
          }}
        >
          <AntDesign
            onPress={iconPressHandler}
            name="adduser"
            size={28}
            color="gray"
          />
          <SearchButton onPress={searchButtonPressHandler} />
        </View>
      )}
    </RowContainer>
  );
};
export default SaloonCustomersListTools;
