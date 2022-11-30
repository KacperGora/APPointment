import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { subHours } from "date-fns";
import { colors } from "../../../colors";
import { Service } from "../../../../types";
import RegularButton from "../../../Buttons/RegularButton";
import { validateFullName } from "../../../../Utils/validation/regexValidation";
interface MeetingDetailProps {
  date: Date;
  service: Service;
  endHour: string;
  worker: string;
  submitHandler: () => {};
  customerName: string;
  showCustomerName: boolean;
}
const NewMeetingFormSummary: React.FC<MeetingDetailProps> = ({
  date,
  service,
  endHour,
  worker,
  submitHandler,
  customerName,
  showCustomerName,
}) => {
  const properDate = subHours(date, 1);
  const dateString = properDate?.toLocaleDateString();
  const hourString = properDate?.toLocaleTimeString().slice(0, 5);
  const customerNameIsValid = validateFullName(customerName);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.detailSubContainer}>
          <View
            style={{
              marginHorizontal: 12,
              alignSelf: "baseline",
            }}
          >
            <Text
              style={{
                color: colors.greydark,
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              {dateString}
            </Text>
            <Text style={styles.serviceNameText}>{service?.value}</Text>
            {customerNameIsValid && showCustomerName && (
              <Text style={styles.customerText}>{customerName}</Text>
            )}
            <Text style={styles.workerText}>Pracownik: {worker}</Text>
          </View>
          <View
            style={{
              marginHorizontal: 12,
            }}
          >
            <Text style={styles.priceText}>{service?.price}</Text>
            <Text style={styles.hoursText}>
              {hourString} - {endHour.slice(0, 5)}
            </Text>
            <RegularButton
              btnStyles={{
                marginVertical: 12,
              }}
              textStyles={{ color: "white", fontWeight: "700", fontSize: 16 }}
              onPress={submitHandler}
            >
              DODAJ
            </RegularButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewMeetingFormSummary;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#3333334f",
    borderRadius: 24,
    marginVertical: 24,
    shadowColor: "lightgray",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "white",
  },
  serviceNameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  workerText: {
    fontSize: 10,
    color: colors.greydark,
    paddingVertical: 12,
  },
  detailsContainer: {
    marginHorizontal: 12,
    marginVertical: 24,
  },
  hoursText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  durationText: {
    color: "#aaa",
  },
  detailSubContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  customerText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.greydark,
    paddingTop: 12,
  },
});
