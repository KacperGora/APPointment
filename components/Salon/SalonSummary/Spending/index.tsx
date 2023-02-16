import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SafeAreaContainer } from "../../../shared";
import FloatingButton from "../../../UI/Buttons/FloatingButton";
import TimelineScreenHeader from "../../../UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import SpendingTable from "./SpendingTable/SpendingTable";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent";
import SpendingForm from "./SpendingForm/SpendingForm";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../colors";
import useGetMonthlyFunds from "../hooks/useGetMonthlyFunds";
import SpendingBottomSummary from "./SpendingBottomSummary/SpendingBottomSummary";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../../types";
const INITALMONTH = {
  short: dayjs().format("MMM"),
  long: dayjs().locale("pl-PL").format("MMMM"),
  index: dayjs().get("month"),
  folder: dayjs().format("MM-YYYY"),
};
const SpendingComponent = () => {
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const navigate = useNavigation<Navigation>();
  const [index, setIndex] = useState(2);
  const [selectedType, setSelectedType] = useState<
    "income" | "spending" | "all"
  >("all");

  const [selectedMonth, setSelectedMonth] = useState<{
    short: string;
    long: string;
    index: number;
    folder: string;
  }>(INITALMONTH);

  const { spending, income, totalData, searchPressHandler } =
    useGetMonthlyFunds(selectedMonth, selectedType);
  const onCloseBottomSheetHandler = () => {
    setBottomSheetShown(false);
    setIndex(0);
  };

  const actions = [
    {
      text: "Dodaj koszt",
      icon: <AntDesign name="plus" size={24} color="white" />,
      name: "addSpending",
      position: 1,
      color: colors.secondary,
    },
  ];

  return (
    <SafeAreaContainer style={{ backgroundColor: "white" }}>
      <TimelineScreenHeader
        onTodayIconPressHandler={() => navigate.navigate("Tydzień")}
        disableCalendar
        disableSearchBar
        monthName={dayjs().format("MMMM")}
      />

      <SpendingTable
        setSelectedMonth={setSelectedMonth}
        setSelectedType={setSelectedType}
        data={totalData?.sort((a, b) => a.date.localeCompare(b.date))}
        searchPressHandler={searchPressHandler}
      />
      <SpendingBottomSummary
        income={income}
        spending={spending}
        selectedMonth={selectedMonth}
      />
      <FloatingButton
        actions={actions}
        onPress={() => {
          setBottomSheetShown(true), setIndex(0);
        }}
      />

      {bottomSheetShown && (
        <BottomSheetComponent
          index={index}
          setIndex={setIndex}
          onCloseBottomSheet={onCloseBottomSheetHandler}
          oneSnap={true}
        >
          <SpendingForm onSubmit={onCloseBottomSheetHandler} />
        </BottomSheetComponent>
      )}
    </SafeAreaContainer>
  );
};
export default SpendingComponent;
