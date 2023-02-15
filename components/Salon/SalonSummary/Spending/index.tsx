import dayjs from "dayjs";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaContainer } from "../../../shared";
import FloatingButton from "../../../UI/Buttons/FloatingButton";
import TimelineScreenHeader from "../../../UI/Headers/TimelineScreenHeader/TimelineScreenHeader";
import SpendingTable from "./SpendingTable/SpendingTable";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent";
import SpendingForm from "./SpendingForm/SpendingForm";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../colors";
import RegularText16 from "../../../UI/Text/RegularText";
import useFetchData from "../../../../hooks/calendar/useFetchData";
import { isSameMonth } from "date-fns";
import useGetMonthlyFunds from "../hooks/useGetMonthlyFunds";
import { SpendingType } from "../../../../types";
const INITALMONTH = {
  short: dayjs().format("MMM"),
  long: dayjs().format("MMMM"),
  index: dayjs().get("month"),
};
const SpendingComponent = () => {
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [index, setIndex] = useState(2);
  const onCloseBottomSheetHandler = () => {
    setBottomSheetShown(false);
    setIndex(0);
  };
  const [selectedMonth, setSelectedMonth] = useState<{
    short: string;
    long: string;
    index: number;
  }>(INITALMONTH);

  const { salonSpending, eventsData } = useFetchData();
  const data: SpendingType[] = Object.values(salonSpending).flat();

  for (const [key, value] of Object.entries(eventsData)) {
    if (
      isSameMonth(dayjs(key).toDate(), new Date()) &&
      new Date().valueOf() > dayjs(key).toDate().valueOf()
    ) {
      const newVal: SpendingType[] = value.flat().map((el) => {
        return {
          name: el.title,
          value: el.servicePrice,
          date: dayjs(el.day).format("DD.MM.YY"),
          folder: dayjs(el.day).format("MM-YYYY"),
          type: "income",
        };
      });
      data.push(...newVal);
    }
  }

  const calculatedSpending: number = useGetMonthlyFunds(data, "spending");
  const calculatedIncome: number = useGetMonthlyFunds(data, "income");

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
        onTodayIconPressHandler={null}
        disableCalendar
        disableSearchBar
        monthName={dayjs().format("MMMM")}
      />

      <SpendingTable
        setSelectedMonth={setSelectedMonth}
        data={data.sort((a, b) => a.date.localeCompare(b.date))}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "20%",
          backgroundColor: "#f7f7f7",
          borderWidth: 1,
          borderColor: "lightgray",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          shadowColor: "lightgray",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        }}
      >
        <RegularText16>
          Podsumowanie miesiąca {selectedMonth.long}
        </RegularText16>
        <Text style={{ paddingVertical: 8 }}>
          Wydano: {calculatedSpending} PLN
        </Text>
        <Text style={{ paddingVertical: 8 }}>
          Uzyskano: {calculatedIncome} PLN
        </Text>
        <Text
          style={{
            fontWeight: "600",
            paddingVertical: 8,
            color: calculatedIncome - calculatedSpending > 0 ? "green" : "red",
          }}
        >
          Bilans: {calculatedIncome - calculatedSpending} PLN
        </Text>
      </View>
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
