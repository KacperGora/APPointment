import React from "react";
import { Text, View, StyleSheet } from "react-native";
import useSetFontSizeForTimelineEvents from "../../../hooks/calendar/useSetFontSizeForTimelineEvent";
import { colors } from "../../colors";

const TimelineEventContent = ({ event, userPickedView }) => {
  const worker = event.worker;

  const fontSize = useSetFontSizeForTimelineEvents(userPickedView);

  return (
    <View style={[{ backgroundColor: event.color }, styles.container]}>
      <View
        style={[
          styles.workerBatch,
          {
            backgroundColor:
              worker === "Monia" ? colors.accent : colors.primary,
          },
        ]}
      >
        <Text style={styles.workerBatchText}>{event.worker?.slice(0, 1)}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={[styles.customerNameText, { fontSize: fontSize }]}>
          {event.title}
        </Text>
        <Text style={[styles.text, { fontSize: fontSize }]}>
          {event.serviceName}
        </Text>
        <Text style={[styles.text, { fontSize: fontSize }]}>
          {event.startHourStr} {event.endHour.slice(0, 5)}
        </Text>
      </View>
    </View>
  );
};
export default TimelineEventContent;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { height: 2, width: 12 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    height: "100%",
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
  customerNameText: {
    fontWeight: "600",

    textAlign: "center",
  },
  workerBatch: {
    height: 16,
    width: 16,
    backgroundColor: colors.accent,
    borderRadius: 50,
  },
  workerBatchText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    position: "relative",

    shadowColor: "black",
    shadowOffset: { height: 4, width: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
  },
});
