import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TimelineEventContent = ({ event }) => {
    console.log(event);
  return (
    <View style={[{ backgroundColor: event.color }, styles.container]}>
      <Text>
        {event.title} - {event.serviceName}
      </Text>
      <Text>
        {event.startHourStr} - {event.endHour.slice(0, 5)}
      </Text>
      <Text style={styles.workerText}>{event.worker}</Text>
    </View>
  );
};
export default TimelineEventContent;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  workerText: {
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
