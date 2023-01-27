import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../../UI/Headers/TimelineScreenHeader/components/Searchbar/SearchBar";
import { RowContainer } from "../../../shared";
import { LayoutAnimation, Text, View } from "react-native";
import SearchButton from "../../../UI/Buttons/SearchButton";
import dayjs from "dayjs";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../colors";

const SaloonCustomersListTools = ({ iconPressHandler, searchPressHandler }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchButtonPressHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setShowSearchBar(true);
  };
  return (
    <RowContainer
      style={{
        justifyContent: "space-between",
        marginHorizontal: 12,
        shadowColor: "gray",
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 12,
      }}
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
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="calendar-check"
              size={16}
              color={colors.greydark}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 16, color: colors.greydark }}>
              {dayjs().format("dddd MMM YYYY")}
            </Text>
          </View>
          <SearchButton onPress={searchButtonPressHandler} />
        </View>
      )}
    </RowContainer>
  );
};
export default SaloonCustomersListTools;
