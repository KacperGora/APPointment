import dayjs from "dayjs";
import React, { useState } from "react";
import { LayoutAnimation } from "react-native";
import { View } from "react-native-animatable";
import { Chip } from "react-native-paper";
import { colors } from "../../../../colors";
import { RowContainer, ScreenWidth } from "../../../../shared";
import SearchButton from "../../../../UI/Buttons/SearchButton";
import SearchBar from "../../../../UI/Headers/TimelineScreenHeader/components/Searchbar/SearchBar";
import { getMonthsArr, getType } from "../config/spendingConfig";
import SpendingTiles from "../SpendingTiles/SpendingTiles";

const SpendingChip = ({
  setSelectedMonth,
  setSelectedType,
  searchPressHandler,
}) => {
  const [expandTypeView, setExpandTypeView] = useState(false);
  const [expandMonthsView, setExpandMonthsView] = useState(false);
  const [monthView, setMonthView] = useState(dayjs().format("MMM"));
  const [showSearchBar, setShowSearchBar] = useState(false);
  const months = getMonthsArr();
  const type = getType();
  const chip = [
    {
      id: 1,
      icon: "calendar-today",
      label: monthView,
      onPress: () => setExpandMonthsView(!expandMonthsView),
    },
    {
      id: 2,
      icon: "cash",
      label: "rodzaj",
      onPress: () => setExpandTypeView(!expandTypeView),
    },
    {
      id: 3,
      icon: "shape",
      label: "kategoria",
      onPress: () => {},
    },
  ];

  const monthNamePressHandler = (el) => {
    setSelectedMonth(...months.filter((m) => m.short === el.short));
    setMonthView(el.short);
    LayoutAnimation.easeInEaseOut();
    setExpandMonthsView(false);
  };
  LayoutAnimation.easeInEaseOut();

  const typePressHandler = (typ) => {
    setSelectedType(typ.type);
    LayoutAnimation.easeInEaseOut();
    setExpandTypeView(false);
  };
  const showSearchBarHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setShowSearchBar(!showSearchBar);
  };

  return (
    <View>
      <RowContainer>
        {showSearchBar ? (
          <SearchBar
            setSearchBarVisible={setShowSearchBar}
            searchPressHandler={searchPressHandler}
          />
        ) : (
          <RowContainer style={{ marginVertical: 12 }}>
            {chip.map((el) => {
              return (
                <Chip
                  key={el.id}
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    marginHorizontal: 5,
                    borderColor: colors.accent,
                  }}
                  icon={el.icon}
                  onPress={el.onPress}
                >
                  {el.label}
                </Chip>
              );
            })}
            <SearchButton onPress={showSearchBarHandler} />
          </RowContainer>
        )}
      </RowContainer>
      {expandMonthsView && (
        <SpendingTiles data={months} pressHandler={monthNamePressHandler} />
      )}

      {expandTypeView && (
        <SpendingTiles data={type} pressHandler={typePressHandler} />
      )}
    </View>
  );
};

export default SpendingChip;
