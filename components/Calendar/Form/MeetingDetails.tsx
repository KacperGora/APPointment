import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReactNative from "react-native";
interface MeetingDetailProps {
  date: Date;
  service: {
    name: string;
    price: string;
    duration: number;
    isActive?: boolean;
  };
}
const MeetingDetails: React.FC<MeetingDetailProps> = ({ date, service }) => {
  const dateString = date?.toLocaleDateString();
  const hourString = date?.toLocaleTimeString().slice(0, 5);

  return (
    <View>
      <View>
        <Text style={styles.summaryText}>Podsumowanie planowanej wizyty</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text>
          <Text style={styles.detailHeading}>Data:</Text> {dateString}
        </Text>
        <Text>
          <Text style={styles.detailHeading}>Godzina:</Text> {hourString}
        </Text>
        <Text>
          <Text style={styles.detailHeading}>Usługa:</Text> {service?.name}
        </Text>
        <Text style={styles.priceText}>{service?.price}</Text>
        <Text>{service?.duration} minut</Text>
      </View>
    </View>
  );
};

export default MeetingDetails;
const styles = StyleSheet.create({
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  detailsContainer: {
    alignItems: "flex-start",
    margin: 14,
  },
  detailHeading: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
