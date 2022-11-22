import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { subHours } from "date-fns";
import { colors } from "../../colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
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
  const properDate = subHours(date, 1);
  const dateString = properDate?.toLocaleDateString();
  const hourString = properDate?.toLocaleTimeString().slice(0, 5);

  return (
    <View>
      <View>
        <Text style={styles.summaryText}>Podsumowanie</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={colors.greydark}
            style={{ marginRight: 12 }}
          />
          <Text> {dateString}</Text>
          <Text> {hourString}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{service?.name}</Text>
        </View>
        <Text style={styles.priceText}>{service?.price}</Text>
        <Text style={styles.durationText}>{service?.duration} minut</Text>
      </View>
    </View>
  );
};

export default MeetingDetails;
const styles = StyleSheet.create({
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    margin: 12,
  },
  detailsContainer: {
    alignItems: "flex-start",
    margin: 14,
  },
  detailHeading: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
    marginRight: 12,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  durationText: {
    color: "gray",
    opacity: 0.6,
  },
});
