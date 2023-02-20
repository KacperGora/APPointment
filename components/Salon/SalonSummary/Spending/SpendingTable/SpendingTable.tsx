import React, { useState } from "react";
import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { colors } from "../../../../colors";
import { RowContainerSpaceBetween, ScreenHeight } from "../../../../shared";
import { uniqueId } from "lodash";
import SpendingChip from "../SpendingChip/SpendingChip";
import SpendingItem from "../SpendingItem/SpendingItem";

const SpendingTable = ({
  setSelectedMonth,
  data,
  setSelectedType,
  searchPressHandler,
}) => {
  const [dateSortType, setDateSortType] = useState<"descending" | "ascending">(
    "descending"
  );

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

  return (
    <DataTable>
      <RowContainerSpaceBetween style={{ marginHorizontal: 12 }}>
        <SpendingChip
          setSelectedMonth={setSelectedMonth}
          setSelectedType={setSelectedType}
          searchPressHandler={searchPressHandler}
        />
      </RowContainerSpaceBetween>

      <DataTable.Header
        style={{
          backgroundColor: "#d1d5db61",
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          borderBottomColor: colors.gray,
        }}
      >
        <DataTable.Title onPress={sortDataHandler} sortDirection={dateSortType}>
          Data
        </DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>Nazwa</DataTable.Title>
        <DataTable.Title>Wartość</DataTable.Title>
      </DataTable.Header>
      <FlatList
        key={uniqueId()}
        style={{ height: ScreenHeight / 2 }}
        data={data}
        renderItem={({ item }) => <SpendingItem item={item} />}
      />
    </DataTable>
  );
};
export default SpendingTable;
