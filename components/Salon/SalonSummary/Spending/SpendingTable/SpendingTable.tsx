import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { View, ScrollView, LayoutAnimation, FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { Chip } from "react-native-paper";
import { colors } from "../../../../colors";
import { ScreenHeight, ScreenWidth } from "../../../../shared";
import SearchBar from "../../../../UI/Headers/TimelineScreenHeader/components/Searchbar/SearchBar";
import SearchButton from "../../../../UI/Buttons/SearchButton";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import RegularText16 from "../../../../UI/Text/RegularText";
import { uniqueId } from "lodash";
import RightActions from "../../../SalonCustomers/components/ItemListRightActions";

const SpendingTable = ({ setSelectedMonth, data }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [dateSortType, setDateSortType] = useState<"descending" | "ascending">(
    "descending"
  );
  const showSearchBarHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setShowSearchBar(!showSearchBar);
  };
  const [monthView, setMonthView] = useState(dayjs().format("MMM"));

  const [expandView, setExpandView] = useState(false);
  const months = Array.from({ length: 12 }, (e, i) => {
    return {
      short: new Date(null, i + 1, null).toLocaleDateString("pl", {
        month: "short",
      }),
      long: new Date(null, i + 1, null).toLocaleDateString("pl", {
        month: "long",
      }),
      index: i,
    };
  });

  const swipeRef = useRef();
  const monthNamePressHandler = (el) => {
    setSelectedMonth(...months.filter((m) => m.short === el.short));
    setMonthView(el.short);
    LayoutAnimation.easeInEaseOut();
    setExpandView(false);
  };
  const chipPressHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setExpandView(!expandView);
  };
  const sortDataHandler = () => {
    setDateSortType((prevState) =>
      prevState === "ascending" ? "descending" : "ascending"
    );
    data.sort((a, b) =>
      dateSortType === "ascending"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );
  };

  const searchPressHandler = () => {};
  return (
    <DataTable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 12,
        }}
      >
        {showSearchBar ? (
          <SearchBar
            setSearchBarVisible={setShowSearchBar}
            searchPressHandler={searchPressHandler}
          />
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: 12,
              }}
            >
              <Chip
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: colors.accent,
                  width: ScreenWidth / 5,
                }}
                icon="calendar-today"
                onPress={chipPressHandler}
              >
                {monthView}
              </Chip>
              <Chip
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  marginHorizontal: 2,
                  borderColor: colors.accent,
                }}
                icon="cash"
                onPress={() => console.log("Pressed")}
              >
                kwota
              </Chip>
              <Chip
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: colors.accent,
                }}
                icon="shape"
                onPress={() => console.log("Pressed")}
              >
                kategoria
              </Chip>
            </View>
            <SearchButton onPress={showSearchBarHandler} />
          </>
        )}
      </View>
      {expandView ? (
        <ScrollView
          contentContainerStyle={{
            alignItems: "flex-start",
            marginHorizontal: 24,
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {months.map((el, idx) => (
            <TouchableOpacity
              style={{
                padding: 8,
                margin: 12,
                alignSelf: "flex-start",
                borderWidth: 2,
                borderColor: colors.gray,
                width: ScreenWidth / 3,
                backgroundColor: "white",
                borderRadius: 12,
                marginVertical: 4,
                shadowColor: "lightgray",
                shadowOffset: { width: 4, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
              onPress={() => monthNamePressHandler(el)}
            >
              <RegularText16 textStyles={{ textAlign: "center" }} key={idx}>
                {el.long}
              </RegularText16>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <>
          <DataTable.Header
            style={{
              backgroundColor: "#d1d5db61",
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomColor: colors.gray,
            }}
          >
            <DataTable.Title
              onPress={sortDataHandler}
              sortDirection={dateSortType}
            >
              Data
            </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Nazwa</DataTable.Title>
            <DataTable.Title>Wartość</DataTable.Title>
          </DataTable.Header>
          <FlatList
            style={{ height: ScreenHeight / 2 }}
            data={data}
            renderItem={({ item }) => {
              return (
                <Swipeable
                  ref={swipeRef}
                  renderRightActions={(progress, dragX) => (
                    <RightActions
                      progress={progress}
                      dragX={dragX}
                      swipeRef={swipeRef}
                    />
                  )}
                >
                  <DataTable.Row key={uniqueId()}>
                    <DataTable.Cell>{item.date}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }}>
                      {item.name}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {item.type === "income" ? "+" : "-"}
                      {item.value} PLN
                    </DataTable.Cell>
                  </DataTable.Row>
                </Swipeable>
              );
            }}
          />
        </>
      )}
    </DataTable>
  );
};
export default SpendingTable;
