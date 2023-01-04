import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { subHours } from "date-fns";
import { colors } from "../../../../colors";
import { SelectiveOptions } from "../../../../../types";
import { validateFullName } from "../../../../../Utils/validation/regexValidation";
import { FontAwesome5 } from "@expo/vector-icons";
import RegularButton from "../../../../UI/Buttons/RegularButton";
import SummaryColumn from "./MeetingFormSummaryColumns/SummaryColumn";
interface MeetingDetailProps {
  date: Date;
  service: SelectiveOptions;
  endHour: string;
  worker: string;
  submitHandler: () => {};
  customerName: string;
}
const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  endHour,
  worker,
  submitHandler,
  customerName,
}) => {
  const properDate = subHours(date, 1);
  const dateString = properDate?.toLocaleDateString();
  const startHour = properDate?.toLocaleTimeString().slice(0, 5);
  const customerNameIsValid = validateFullName(customerName);
  const firstColumnData = {
    title: {
      value: service?.value,
      styling: { fontWeight: "600", fontSize: 16 },
    },
    subTitle: { value: customerName },
    detail: `Pracownik: ${worker}`,
  };
  const secondColumnData = {
    title: {
      value: dateString,
      styling: { fontWeight: "500", fontSize: 10, alignSelf: "flex-end" },
    },
    subTitle: {
      value: {
        start: startHour,
        end: endHour,
      },
      styling: { alignSelf: "flex-end", fontSize: 12, marginBottom: 4 },
    },
    detail: (
      <Pressable
        onPress={submitHandler}
        style={({ pressed }) => {
          return [
            pressed && { opacity: 0.3 },
            {
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.3,
              borderColor: colors.tertiary,
              shadowColor: "lightgray",
              shadowOffset: { height: 2, width: 4 },
              backgroundColor: "white",
              shadowOpacity: 0.4,
              shadowRadius: 2,
              borderRadius: 12,
              paddingHorizontal: 6,
              paddingVertical: 12,
              justifyContent: "space-evenly",
            },
          ];
        }}
      >
        <Text style={{ marginRight: 6, color: "black", fontWeight: "600" }}>
          {service?.price}
        </Text>
        <FontAwesome5 name="calendar-check" size={20} color={colors.primary} />
      </Pressable>
    ),
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SummaryColumn data={firstColumnData} />
        <SummaryColumn data={secondColumnData} />
      </View>
      {/* <RegularButton
        btnStyles={{
          marginVertical: 12,
          width: 90,
          alignSelf: "flex-end",
        }}
        textStyles={{ color: "white", fontSize: 12 }}
        onPress={submitHandler}
        title={<FontAwesome5 name="calendar-check" size={24} color="black" />}
        primary
      /> */}

      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text>40PLN</Text>
       
      </View> */}
    </View>
  );
};

export default NewMeetingFormSummary;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    marginVertical: 24,
    marginHorizontal: 12,
    padding: 12,
    shadowColor: "lightgray",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "white",
  },
});
