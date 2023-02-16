import React from "react";
import { Text, View } from "react-native";
import RegularText16 from "../../../../UI/Text/RegularText";

const SpendingBottomSummary = ({ selectedMonth, income, spending }) => {
  return (
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
      <RegularText16>Podsumowanie miesiąca {selectedMonth.long}</RegularText16>
      <Text style={{ paddingVertical: 8 }}>Wydano: {spending} PLN</Text>
      <Text style={{ paddingVertical: 8 }}>Uzyskano: {income} PLN</Text>
      <Text
        style={{
          fontWeight: "600",
          paddingVertical: 8,
          color: income - spending > 0 ? "green" : "red",
        }}
      >
        Bilans: {income - spending} PLN
      </Text>
    </View>
  );
};
export default SpendingBottomSummary;
